package com.clothing.product;

<<<<<<< HEAD
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
=======
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
>>>>>>> 7a1550d4a0a2f0d66d567bb005ba888344454c02

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByCustomerId(Long customerId);
}
