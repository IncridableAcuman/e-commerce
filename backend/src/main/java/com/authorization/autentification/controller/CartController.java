package com.authorization.autentification.controller;

import com.authorization.autentification.model.Cart;
import com.authorization.autentification.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;
    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(@RequestParam Long userId,@RequestParam Long productId,@RequestParam(defaultValue = "1") int quantity){
        Cart updatedCart=cartService.addToCart(userId,productId,quantity);
        return ResponseEntity.ok(updatedCart);
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<Cart> getCartByUser(@PathVariable Long userId){
        Cart cart=cartService.getCartByUser(userId);
        return ResponseEntity.ok(cart);
    }

}
