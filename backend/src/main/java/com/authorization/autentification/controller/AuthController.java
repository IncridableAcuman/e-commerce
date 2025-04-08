package com.authorization.autentification.controller;

import com.authorization.autentification.DTO.AuthRequest;
import com.authorization.autentification.DTO.AuthResponse;
import com.authorization.autentification.DTO.SignInRequest;
import com.authorization.autentification.model.User;
import com.authorization.autentification.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/signUp")
    public ResponseEntity<AuthResponse> userSignUp(@Valid @RequestBody AuthRequest request,HttpServletResponse response){
        return ResponseEntity.ok(authService.userSignUp(request,response));
    }

    @PostMapping("/signIn")
    public ResponseEntity<AuthResponse> userSignIn(@Valid @RequestBody SignInRequest request,HttpServletResponse response){
        return ResponseEntity.ok(authService.userSignIn(request,response));
    }

    @GetMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@RequestHeader("Authorization") String authorization) {
        String refreshToken = authorization.substring(7);
        return ResponseEntity.ok(authService.refresh(refreshToken));
    }
    @PostMapping("/signOut")
    public ResponseEntity<String> userSignOut(@RequestHeader("Authorization") String authorization){
        String refreshToken=authorization.substring(7);
        authService.userSignOut(refreshToken);
        return ResponseEntity.ok("Successfully signed out");
    }
    @PostMapping("forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String,String> request){
        return  ResponseEntity.ok(authService.forgotPassword(request.get("email")));
    }
    @PutMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String,String> request){
        return ResponseEntity.ok(authService.resetPassword(request.get("password"),request.get("token")));
    }
    @GetMapping("/me")
    public ResponseEntity<User> getUserData(@RequestHeader("Authorization") String authHeader){
        String token=authHeader.substring(7);
        return ResponseEntity.ok(authService.getUserData(token));
    }

}
