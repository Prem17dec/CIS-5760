package com.clothing.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {
    @Autowired CustomerRepository repo;

    @Override
    public void run(String... args) {
        // Seed ONLY the admin account
        repo.findByEmail("admin@wcs.com").orElseGet(() -> {
            Customer a = new Customer();
            a.setName("Store Admin");
            a.setEmail("admin@wcs.com");
            a.setPasswordHash(BCrypt.hashpw("admin123", BCrypt.gensalt()));
            a.setRole("ADMIN");
            return repo.save(a);
        });
    }
}
