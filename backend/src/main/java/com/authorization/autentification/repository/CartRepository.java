package com.authorization.autentification.repository;

import com.authorization.autentification.model.Cart;
import com.authorization.autentification.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart,Long> {
    Optional<Cart> findByUser(User user);
}
