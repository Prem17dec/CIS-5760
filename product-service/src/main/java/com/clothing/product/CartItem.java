package com.clothing.product;

<<<<<<< HEAD
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
=======
import jakarta.persistence.*;
>>>>>>> 7a1550d4a0a2f0d66d567bb005ba888344454c02

@Entity
public class CartItem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Cart cart;

    private Long productId;
    private String productName;
    private double price;
    private int quantity;

    public Long getId() { return id; }
    public Cart getCart() { return cart; }
    public Long getProductId() { return productId; }
    public String getProductName() { return productName; }
    public double getPrice() { return price; }
    public int getQuantity() { return quantity; }

    public void setId(Long id) { this.id = id; }
    public void setCart(Cart cart) { this.cart = cart; }
    public void setProductId(Long productId) { this.productId = productId; }
    public void setProductName(String productName) { this.productName = productName; }
    public void setPrice(double price) { this.price = price; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
}
