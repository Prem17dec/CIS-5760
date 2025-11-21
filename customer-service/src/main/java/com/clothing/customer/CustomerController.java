package com.clothing.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/customers")
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;

    // This endpoint now requires the user to be authenticated and have the 'ADMIN' role.
    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<String>> getAllCustomerEmails() {
        List<String> emails = customerRepository.findAll().stream()
                .map(Customer::getEmail) // FIX: Changed from getName() to getEmail()
                .collect(Collectors.toList());
        return ResponseEntity.ok(emails);
    }
}