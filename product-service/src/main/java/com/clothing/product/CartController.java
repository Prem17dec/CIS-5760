package com.clothing.product;

<<<<<<< HEAD
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
=======
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Optional;
>>>>>>> 7a1550d4a0a2f0d66d567bb005ba888344454c02

@RestController
@CrossOrigin("*")
@RequestMapping("/carts")
public class CartController {

    @Autowired private CartRepository cartRepo;
    @Autowired private ProductRepository productRepo;

    private Cart getOrCreateCart(Long customerId) {
        return cartRepo.findByCustomerId(customerId).orElseGet(() -> {
            Cart c = new Cart();
            c.setCustomerId(customerId);
            return cartRepo.save(c);
        });
    }

    @GetMapping("/{customerId}")
    public Cart getCart(@PathVariable Long customerId) {
        return getOrCreateCart(customerId);
    }

    static class AddItemRequest {
        public Long productId;
        public int quantity;
    }

    @PostMapping("/{customerId}/items")
    public Cart addItem(@PathVariable Long customerId, @RequestBody AddItemRequest req) {
        Cart cart = getOrCreateCart(customerId);
        Product p = productRepo.findById(req.productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Optional<CartItem> existing = cart.getItems().stream()
                .filter(ci -> ci.getProductId().equals(p.getId()))
                .findFirst();

        if (existing.isPresent()) {
            CartItem ci = existing.get();
            ci.setQuantity(ci.getQuantity() + req.quantity);
        } else {
            CartItem ci = new CartItem();
            ci.setCart(cart);
            ci.setProductId(p.getId());
            ci.setProductName(p.getName());
            ci.setPrice(p.getPrice());
            ci.setQuantity(req.quantity);
            cart.getItems().add(ci);
        }
        return cartRepo.save(cart);
    }

    @PutMapping("/{customerId}/items/{itemId}")
    public Cart updateQty(@PathVariable Long customerId,
                          @PathVariable Long itemId,
                          @RequestParam int quantity) {
        Cart cart = getOrCreateCart(customerId);
        cart.getItems().stream()
                .filter(ci -> ci.getId().equals(itemId))
                .findFirst()
                .ifPresent(ci -> ci.setQuantity(quantity));
        return cartRepo.save(cart);
    }

    @DeleteMapping("/{customerId}/items/{itemId}")
    public Cart deleteItem(@PathVariable Long customerId, @PathVariable Long itemId) {
        Cart cart = getOrCreateCart(customerId);
        cart.getItems().removeIf(ci -> ci.getId().equals(itemId));
        return cartRepo.save(cart);
    }

    @DeleteMapping("/{customerId}")
    public void clearCart(@PathVariable Long customerId) {
        cartRepo.findByCustomerId(customerId).ifPresent(cartRepo::delete);
    }
}
