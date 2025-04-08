package com.authorization.autentification.service;

import com.authorization.autentification.model.Cart;
import com.authorization.autentification.model.CartItem;
import com.authorization.autentification.model.Product;
import com.authorization.autentification.model.User;
import com.authorization.autentification.repository.AuthRepository;
import com.authorization.autentification.repository.CartRepository;
import com.authorization.autentification.repository.ProductRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final AuthRepository authRepository;

    @Transactional
    public Cart addToCart(Long userId,Long productId,int quantity){
        User user=authRepository.findById(userId)//searching user
                .orElseThrow(()-> new  RuntimeException("User not found"));
        Product product=productRepository.findById(productId)
                .orElseThrow(()->new RuntimeException("Product not found"));
        Cart cart=cartRepository.findByUser(user).orElseGet(()->{
            Cart newCart=new Cart();
            newCart.setUser(user);
            return cartRepository.save(newCart);
        });
        // finding from cart
        Optional<CartItem> existingItem=cart.getItems().stream()
                .filter(item->item.getProduct().getId().equals(productId)).findFirst();
        if(existingItem.isPresent()){
            existingItem.get().setQuantity(existingItem.get().getQuantity()+quantity);
        } else{
            CartItem newItem=new CartItem();
            newItem.setProduct(product);
            newItem.setQuantity(quantity);
            newItem.setCart(cart);
            cart.getItems().add(newItem);
        }
        return cartRepository.save(cart);

    }
    @Transactional
    public Cart getCartByUser(Long userId){
        User user=authRepository.findById(userId).orElseThrow(()->new RuntimeException(("User not found")));
        return cartRepository.findByUser(user).orElseThrow(()->
                new RuntimeException("Cart not found"));
    }
}
