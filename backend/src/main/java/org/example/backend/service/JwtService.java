package org.example.backend.service;

import org.example.backend.entity.User;

public interface JwtService {
String generateToken(User user);
String generateRefreshToken(User user);
String extractToken(String token);
}
