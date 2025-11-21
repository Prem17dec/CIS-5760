package com.clothing.customer;

import com.clothing.customer.dto.AuthDtos.LoginRequest;
import com.clothing.customer.dto.AuthDtos.LoginResponse;
import com.clothing.customer.dto.AuthDtos.RegisterRequest;
import com.clothing.customer.security.CustomerDetails;
import com.clothing.customer.security.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000") // Explicitly allow frontend origin
public class AuthController {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager; // Used to authenticate users

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest request) {
        // Check if user already exists
        Optional<Customer> existingCustomer = customerRepository.findByEmail(request.getEmail());
        if (existingCustomer.isPresent()) {
            return new ResponseEntity<>("User with this email already exists", HttpStatus.BAD_REQUEST);
        }

        Customer newCustomer = new Customer();
        newCustomer.setEmail(request.getEmail());
        // Hash the password before saving
        newCustomer.setPassword(passwordEncoder.encode(request.getPassword()));
        // Assign default role. We'll set the first registered user as ADMIN, others as USER
        if (customerRepository.count() == 0) {
            newCustomer.setRole("ROLE_ADMIN");
        } else {
            newCustomer.setRole("ROLE_USER");
        }
        
        Customer savedCustomer = customerRepository.save(newCustomer);
        
        // Return success and generate a token upon registration for convenience
        String token = jwtUtil.generateToken(savedCustomer.getEmail());
        // FIX: Now passing the customer ID to the LoginResponse constructor
        return ResponseEntity.ok(new LoginResponse(
            savedCustomer.getId(), // New parameter
            token,
            savedCustomer.getEmail(),
            savedCustomer.getRole()
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest request) {
        try {
            // Attempt to authenticate the user using the AuthenticationManager
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            // Authentication successful if no exception was thrown
            CustomerDetails userDetails = (CustomerDetails) authentication.getPrincipal();
            String token = jwtUtil.generateToken(userDetails.getUsername());
            String role = userDetails.getAuthorities().stream().findFirst().get().getAuthority();
            
            // Fetch the actual customer ID from the repository to use in the response
            Long customerId = customerRepository.findByEmail(userDetails.getUsername())
                                .map(Customer::getId)
                                .orElse(null); // Should not happen if authentication succeeded

            // FIX: Now passing the customer ID to the LoginResponse constructor
            return ResponseEntity.ok(new LoginResponse(
                customerId, // New parameter
                token,
                userDetails.getUsername(),
                role
            ));

        } catch (UsernameNotFoundException e) {
            return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            // Catching BadCredentialsException or other auth errors
            return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }
    }
}