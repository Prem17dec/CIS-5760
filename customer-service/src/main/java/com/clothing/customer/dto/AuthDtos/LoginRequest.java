package com.clothing.customer.dto.AuthDtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class LoginRequest {

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    // --- Getters ---

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}