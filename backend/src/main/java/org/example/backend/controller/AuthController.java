package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.service.AuthService;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
final AuthService authService;
    @GetMapping("/login")
    public HttpEntity<?> loginUser(@RequestParam String username, @RequestParam String password) {
     return authService.login(username, password);
}
}
