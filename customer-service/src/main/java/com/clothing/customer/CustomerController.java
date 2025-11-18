package com.clothing.customer;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/customers")
@CrossOrigin(origins = "*")
public class CustomerController {
    private final CustomerRepository repo;
    public CustomerController(CustomerRepository repo) { this.repo = repo; }

    @GetMapping
    public List<Customer> getAll() { return repo.findAll(); }

    @GetMapping("/{id}")
    public Optional<Customer> getOne(@PathVariable Long id) { return repo.findById(id); }

    @PostMapping
    public Customer create(@RequestBody Customer c) { return repo.save(c); }

    @PutMapping("/{id}")
    public Customer update(@PathVariable Long id, @RequestBody Customer c) {
        Customer existing = repo.findById(id).orElseThrow();
        existing.setName(c.getName());
        existing.setEmail(c.getEmail());
        return repo.save(existing);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { repo.deleteById(id); }
}
