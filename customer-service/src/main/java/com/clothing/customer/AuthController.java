package com.clothing.customer;

import com.clothing.customer.dto.AuthDtos.*;
import com.clothing.customer.dto.AuthDtos.LoginRequest;
import com.clothing.customer.dto.AuthDtos.LoginResponse;
import com.clothing.customer.dto.AuthDtos.RegisterRequest;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private CustomerRepository repo;

    // POST /auth/login  {email,password}
    // If email exists: verify password.
    // If email doesn't exist: auto-register as CUSTOMER with this email+password.
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest req) {
        Optional<Customer> opt = repo.findByEmail(req.email);

        if (opt.isEmpty()) {
            // Auto-register new CUSTOMER
            Customer c = new Customer();
            c.setEmail(req.email);
            // Derive a simple display name from the email's local-part
            String local = req.email.contains("@") ? req.email.substring(0, req.email.indexOf('@')) : req.email;
            c.setName(local.isBlank() ? "New Customer" : local);
            c.setPasswordHash(BCrypt.hashpw(req.password, BCrypt.gensalt()));
            c.setRole("CUSTOMER");
            c = repo.save(c);
            return new LoginResponse(c.getId(), c.getName(), c.getEmail(), c.getRole());
        }

        Customer c = opt.get();
        if (!BCrypt.checkpw(req.password, c.getPasswordHash())) {
            // wrong password for an existing account
            throw new RuntimeException("Invalid credentials");
        }
        return new LoginResponse(c.getId(), c.getName(), c.getEmail(), c.getRole());
    }

    // Optional: keep /auth/register if you want manual registration as well
    @PostMapping("/register")
    public Customer register(@RequestBody RegisterRequest req) {
        Customer c = new Customer();
        c.setName(req.name);
        c.setEmail(req.email);
        c.setPasswordHash(BCrypt.hashpw(req.password, BCrypt.gensalt()));
        c.setRole("CUSTOMER");
        return repo.save(c);
    }
}
