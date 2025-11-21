package com.clothing.customer.dto.AuthDtos;

public class LoginResponse {

    private Long id;
    private String token;
    private String email;
    private String role;

    // The AuthController was failing because it expected the 'id' here.
    public LoginResponse(Long id, String token, String email, String role) {
        this.id = id;
        this.token = token;
        this.email = email;
        this.role = role;
    }

    // --- Getters ---

    public Long getId() {
        return id;
    }

    public String getToken() {
        return token;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }
}