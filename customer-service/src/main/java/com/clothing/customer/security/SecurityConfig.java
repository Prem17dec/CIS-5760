package com.clothing.customer.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager; // <-- Import
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration; // <-- Import
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration 
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    /**
     * Defines the BCryptPasswordEncoder bean, required for hashing and verifying passwords.
     * This was the source of the first dependency injection error we fixed.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Exposes the AuthenticationManager bean, required by the AuthController
     * to perform the actual authentication logic (username/password check).
     * This resolves the current "No qualifying bean" error.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 1. Disable CSRF (common for stateless APIs)
            .csrf(AbstractHttpConfigurer::disable)
            
            // 2. Set session management to stateless
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            
            // 3. Configure authorization rules
            .authorizeHttpRequests(auth -> auth
                // FIX for H2 BLANK SCREEN: Allow access to the console endpoint
                .requestMatchers("/h2-console/**").permitAll() 
                
                // Allow public access to registration and login endpoints
                .requestMatchers("/auth/**").permitAll() 
                
                // Require authentication for all other requests
                .anyRequest().authenticated()
            )
            
            // 4. Add the custom JWT filter
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        // FIX for H2 BLANK SCREEN: Allow H2 Console to load in an iframe (Frame Options)
        http.headers(headers -> headers.frameOptions(frameOptions -> frameOptions.sameOrigin()));

        return http.build();
    }
}
