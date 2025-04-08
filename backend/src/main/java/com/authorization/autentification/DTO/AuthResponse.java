package com.authorization.autentification.DTO;

import lombok.Data;

@Data
public class AuthResponse {
    private String username;
    private String email;
    private String accessToken;
    private String refreshToken;

    public AuthResponse(String username, String email, String accessToken, String refreshToken) {
        this.username = username;
        this.email = email;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
    public String getUsername() {
        return username;
    }
    public String getEmail() {
        return email;
    }
    public String getAccessToken() {
        return accessToken;
    }
    public String getRefreshToken() {
        return refreshToken;
    }
}
