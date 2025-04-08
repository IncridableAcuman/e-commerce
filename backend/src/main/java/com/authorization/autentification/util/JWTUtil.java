package com.authorization.autentification.util;

import com.authorization.autentification.model.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JWTUtil {
    private static final String secret = Base64.getEncoder().encodeToString("uzbekistanEpisode1234567890abcdef1234567890".getBytes(StandardCharsets.UTF_8));
    private static final long accessTime = 15 * 60 * 1000;
    private static final long refreshTime = 7 * 24 * 60 * 60 * 1000;

private Key getSigningKey(){
    return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
}
public String generateToken(User user,long expirationTime){
    return Jwts
            .builder()
            .setSubject(user.getUsername())
            .claim("email",user.getEmail())
            .claim("role",user.getRole())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis()+expirationTime))
            .signWith(getSigningKey(),SignatureAlgorithm.HS256)
            .compact();
}
public Map<String ,String > generateTokens(User user){
    Map<String,String> tokens=new HashMap<>();
    tokens.put("accessToken",generateToken(user,accessTime));
    tokens.put("refreshToken",generateToken(user,refreshTime));
    return tokens;

}
public boolean validateToken(String token){
    try {
        Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token);
        return true;
    } catch (Exception e){
        return false;
    }
}
public String extractUsername(String token){
    return Jwts
            .parserBuilder()
            .setSigningKey(getSigningKey())
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
}
}
