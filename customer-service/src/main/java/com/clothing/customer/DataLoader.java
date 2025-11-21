package com.clothing.customer;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataLoader {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Inject the password encoder

    @PostConstruct
    public void init() {
        if (customerRepository.count() == 0) {
            // Admin User
            Customer admin = new Customer();
            admin.setEmail("admin@example.com"); // FIX: Changed setName to setEmail
            admin.setPassword(passwordEncoder.encode("password")); // FIX: Changed setPasswordHash to setPassword and encoded
            admin.setRole("ROLE_ADMIN");
            customerRepository.save(admin);

            // Regular User
            Customer user = new Customer();
            user.setEmail("user@example.com"); // FIX: Changed setName to setEmail
            user.setPassword(passwordEncoder.encode("password")); // FIX: Changed setPasswordHash to setPassword and encoded
            user.setRole("ROLE_USER");
            customerRepository.save(user);

            System.out.println("Initialized Admin and Regular User accounts.");
        }
    }
}