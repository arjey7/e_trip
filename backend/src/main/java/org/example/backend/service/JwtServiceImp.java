package org.example.backend.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.example.backend.entity.User;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Map;

@Service
public class JwtServiceImp implements JwtService{

    @Override
    public String generateToken(User user) {
        Map<String, String> claimMap = Map.of("username", user.getUsername(), "id", user.getId().toString());
        String token = Jwts.builder().issuedAt(new Date()).expiration(new Date(System.currentTimeMillis() + 1000 * 5)).
                claims(claimMap).signWith(getSecretKey()).subject(user.getId().toString()).compact();
    return token;}

    @Override
    public String generateRefreshToken(User user) {
        Map<String, String> claimMap = Map.of("username", user.getUsername(), "id", user.getId().toString());
        String token = Jwts.builder().issuedAt(new Date()).expiration(new Date(System.currentTimeMillis() + 1000 * 30)).
                claims(claimMap).signWith(getSecretKey()).subject(user.getId().toString()).compact();
        return token;
    }

    @Override
    public String extractToken(String token) {
        String subject = Jwts.parser().verifyWith(getSecretKey()).build().parseSignedClaims(token).getPayload().getSubject();
        return subject;
    }

    private SecretKey getSecretKey() {
       String key="w7Xrj3GcrfAJXJkStJ4qxC09iISB6YDfm0YNAg/ZTH4=";
        byte[] decode = Decoders.BASE64.decode(key);
        return Keys.hmacShaKeyFor(decode);

    }
}
