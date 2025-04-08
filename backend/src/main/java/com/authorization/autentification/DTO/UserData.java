package com.authorization.autentification.DTO;

import com.authorization.autentification.model.Cart;
import com.authorization.autentification.model.Role;
import lombok.Data;

@Data
public class UserData {
    private Long id;
    private String username;
    private String email;
    private Role role;
    private Cart cart;
}
