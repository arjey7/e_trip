package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.entity.User;
import org.example.backend.repository.UserRepo;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthServiceImp implements AuthService {
final UserRepo userRepo;
final AuthenticationManager authenticationManager;
final JwtService jwtService;
    @Override
    public HttpEntity<?> login(String username, String password) {
        User user = userRepo.findByUsername(username).orElseThrow();
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        String access_token = jwtService.generateToken(user);
        String refresh_token = jwtService.generateRefreshToken(user);
        return ResponseEntity.ok(Map.of("access_token",access_token,"refresh_token",refresh_token));
    }
}
