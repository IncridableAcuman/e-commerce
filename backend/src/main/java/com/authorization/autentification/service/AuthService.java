package com.authorization.autentification.service;
import com.authorization.autentification.DTO.AuthRequest;
import com.authorization.autentification.DTO.AuthResponse;
import com.authorization.autentification.DTO.SignInRequest;
import com.authorization.autentification.model.RefreshToken;
import com.authorization.autentification.model.Role;
import com.authorization.autentification.model.User;
import com.authorization.autentification.repository.AuthRepository;
import com.authorization.autentification.repository.RefreshTokenRepository;
import com.authorization.autentification.util.JWTUtil;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final  AuthRepository authRepository;
    private final  PasswordEncoder passwordEncoder;
    private final JWTUtil jwtUtil;
    private final RefreshTokenRepository refreshTokenRepository;
    private final MailService mailService;

    @Transactional
    public AuthResponse userSignUp(AuthRequest request,HttpServletResponse response){
        if(authRepository.findByEmail(request.getEmail()).isPresent() || authRepository.findByUsername(request.getUsername()).isPresent()){
            throw new RuntimeException("Username or email already exist");
        }
        User user=new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);
        authRepository.save(user);
        String refreshToken=jwtUtil.generateToken(user,604800000);
        RefreshToken token=new RefreshToken();
        token.setUser(user);
        token.setToken(refreshToken);
        token.setExpiryDate(new Date(System.currentTimeMillis()+604800000));
        refreshTokenRepository.save(token);
        ResponseCookie responseCookie=ResponseCookie.from("refreshToken",refreshToken)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(7*24*60*60)
                .build();
        response.addHeader("Set-Cookie",responseCookie.toString());
        return new AuthResponse(user.getId(),user.getUsername(),user.getEmail(),jwtUtil.generateToken(user,900000),refreshToken);
    }

    @Transactional
    public AuthResponse userSignIn(SignInRequest request,HttpServletResponse response){
        User user=authRepository.findByEmail(request.getEmail()).orElseThrow(()->new RuntimeException("User not found"));
        if(!passwordEncoder.matches(request.getPassword(),user.getPassword())){
            throw new RuntimeException("Invalid password");
        }
        String accessToken=jwtUtil.generateToken(user,900000);
        RefreshToken refreshToken=refreshTokenRepository.findByUser(user)
                .orElseGet(()->{
                    RefreshToken token=new RefreshToken();
                    token.setUser(user);
                    token.setToken(jwtUtil.generateToken(user,604800000));
                    token.setExpiryDate(new Date(System.currentTimeMillis()+604800000));
                    return refreshTokenRepository.save(token);
                });
        ResponseCookie responseCookie=ResponseCookie.from("refreshToken",refreshToken.getToken())
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(7*24*60*60)
                .build();
        response.addHeader("Set-Cookie",responseCookie.toString());
        return new AuthResponse(user.getId(),user.getUsername(),user.getEmail(),accessToken,refreshToken.getToken());
    }
    @Transactional
    public AuthResponse refresh(String refreshToken, HttpServletResponse response) {
    if (refreshToken == null || refreshToken.isEmpty()) {
        throw new RuntimeException("Refresh token is missing");
    }

    if (!jwtUtil.validateToken(refreshToken)) {
        throw new RuntimeException("Invalid refresh token");
    }

    String username;
    try {
        username = jwtUtil.extractUsername(refreshToken);
    } catch (Exception e) {
        throw new RuntimeException("Could not extract username from token");
    }

    User user = authRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));

    RefreshToken savedToken = refreshTokenRepository.findByUser(user)
            .orElseThrow(() -> new RuntimeException("Refresh token not found"));

    if (!savedToken.getToken().equals(refreshToken)) {
        throw new RuntimeException("Refresh token mismatch");
    }

    if (savedToken.getExpiryDate().before(new Date())) {
        throw new RuntimeException("Refresh token expired");
    }

    // Generate new tokens
    String newAccessToken = jwtUtil.generateToken(user, 900000); // 15 min
    String newRefreshToken = jwtUtil.generateToken(user, 604800000); // 7 days

    savedToken.setToken(newRefreshToken);
    savedToken.setExpiryDate(new Date(System.currentTimeMillis() + 604800000));
    refreshTokenRepository.save(savedToken);

    // Set new refreshToken in cookie
    ResponseCookie responseCookie = ResponseCookie.from("refreshToken", newRefreshToken)
            .httpOnly(true)
            .secure(false)
            .path("/")
            .maxAge(7 * 24 * 60 * 60)
            .build();
    response.addHeader("Set-Cookie", responseCookie.toString());

    return new AuthResponse(user.getId(),user.getUsername(), user.getEmail(), newAccessToken, newRefreshToken);
}

    @Transactional
    public void userSignOut(String refreshToken){
        RefreshToken token=refreshTokenRepository.findByToken(refreshToken)
                .orElseThrow(()->new RuntimeException("Invalid token"));
        refreshTokenRepository.delete(token);
    }
    @Transactional
    public String forgotPassword(String email){
        User user=authRepository.findByEmail(email).orElseThrow(()->
                new RuntimeException("User not found"));
        String token=jwtUtil.generateToken(user,900000);
        String resetLink="http://localhost:5173/reset-password?token="+token;
        mailService.sendEmail(user.getEmail(),"Reset Password","Click this link to reset your password:"+resetLink);
        return "Reset link sent to your email";
    }
    @Transactional
    public String resetPassword(String password,String token){
        if(password.isEmpty() || token.isEmpty()){
            throw new RuntimeException("All fields are required");
        }
        boolean userPayload=jwtUtil.validateToken(token);
        if(!userPayload){
            throw new RuntimeException("Invalid token");
        }
        RefreshToken token1=refreshTokenRepository.findByToken(token).orElseThrow(()->new RuntimeException("Invalid or expired token"));
        User user=token1.getUser();
        user.setPassword(passwordEncoder.encode(password));
        authRepository.save(user);
        return "Password reset successfully";
    }
    @Transactional
    public User getUserData(String token){
        if(!jwtUtil.validateToken(token)){
            throw new RuntimeException("Token not valid!");
        }
        String username=jwtUtil.extractUsername(token);
        return authRepository.findByUsername(username).
                orElseThrow(()->new RuntimeException("User not found"));
    }
}