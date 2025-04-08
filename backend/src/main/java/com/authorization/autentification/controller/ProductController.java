package com.authorization.autentification.controller;

import com.authorization.autentification.model.Product;
import com.authorization.autentification.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;
    @PostMapping("/create")
    public ResponseEntity<Product> createProduct(@RequestBody  Product product){
        return ResponseEntity.ok(productService.createProduct(product));
    }
    @GetMapping("/all-products")
    public ResponseEntity<List<Product>> getAllProducts(){
        return ResponseEntity.ok(productService.getAllProducts());
    }
    @GetMapping("/one/{id}")
    public ResponseEntity<Optional<Product>> getProductById(@PathVariable Long id){
        return ResponseEntity.ok(productService.getProductById(id));
    }
    @GetMapping("/products-all/{name}")
    public ResponseEntity<Optional<Product>> findByName(@PathVariable String name){
        return ResponseEntity.ok(productService.findByName(name));
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id,@RequestBody Product product){
        return ResponseEntity.ok(productService.updateProduct(id,product));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id){
        return ResponseEntity.ok(productService.deleteProduct(id));
    }
    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProduct(@RequestParam String keyword){
        return ResponseEntity.ok(productService.searchProducts(keyword));
    }
}
