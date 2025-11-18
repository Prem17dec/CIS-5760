package com.clothing.customer.dto;




public class AuthDtos {
    public static class LoginRequest {
        public String email;
        public String password;
    }
    public static class LoginResponse {
        public Long customerId;
        public String name;
        public String email;
        public String role;
        public LoginResponse(Long id, String n, String e, String r) {
            this.customerId = id; this.name = n; this.email = e; this.role = r;
        }
    }
    public static class RegisterRequest {
        public String name;
        public String email;
        public String password;
    }
}

