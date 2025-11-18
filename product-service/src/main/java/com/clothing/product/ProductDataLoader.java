package com.clothing.product;

<<<<<<< HEAD
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
=======
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
>>>>>>> 7a1550d4a0a2f0d66d567bb005ba888344454c02

@Component
public class ProductDataLoader implements CommandLineRunner {
    @Autowired private ProductRepository repo;

    @Override
    public void run(String... args) {
        if (repo.count() == 0) {
            Product p1 = new Product(); p1.setName("Blue Tee"); p1.setPrice(19.99); p1.setStock(20);
            Product p2 = new Product(); p2.setName("Black Jeans"); p2.setPrice(39.99); p2.setStock(15);
            Product p3 = new Product(); p3.setName("Red Hoodie"); p3.setPrice(49.99); p3.setStock(10);
            repo.save(p1); repo.save(p2); repo.save(p3);
        }
    }
}
