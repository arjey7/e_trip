package org.example.backend.service;

import org.springframework.http.HttpEntity;

public interface AuthService {
HttpEntity<?> login(String username, String password);
}
