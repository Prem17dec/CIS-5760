package com.clothing.customer.security;

import com.clothing.customer.Customer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

// This class wraps the Customer entity to be used by Spring Security
public class CustomerDetails implements UserDetails {

    private String email;
    private String password;
    private List<GrantedAuthority> authorities;

    public CustomerDetails(Customer customer) {
        this.email = customer.getEmail();
        this.password = customer.getPassword();
        // Assume 'role' field is a String in the Customer entity (e.g., "ROLE_USER" or "ROLE_ADMIN")
        this.authorities = List.of(new SimpleGrantedAuthority(customer.getRole()));
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}