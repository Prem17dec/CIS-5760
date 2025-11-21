package com.clothing.customer.security;

import com.clothing.customer.Customer;
import com.clothing.customer.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerDetailsService implements UserDetailsService {

    @Autowired
    private CustomerRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        
        Optional<Customer> customer = repository.findByEmail(username);

        // If the user is not found, throw an exception
        if (customer.isEmpty()) {
            throw new UsernameNotFoundException("User not found: " + username);
        }

        // Map the Customer entity to Spring Security's UserDetails interface
        Customer foundCustomer = customer.get();
        return new CustomerDetails(foundCustomer);
    }
}