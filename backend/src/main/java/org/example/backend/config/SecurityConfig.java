package org.example.backend.config;

import lombok.RequiredArgsConstructor;
import org.example.backend.repository.UserRepo;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    final UserRepo userRepo;

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/files/img","/files/video").permitAll()
                        .requestMatchers(HttpMethod.GET, "/files/img","/files/video","/api/tour","/api/tourDay").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/tour","/api/tourDay").permitAll()
                        .requestMatchers(HttpMethod.GET,"/api/tour/getAll").permitAll()
                        .requestMatchers(HttpMethod.POST,"/api/comment").permitAll()
                        .requestMatchers(HttpMethod.GET,"/api/comment/all","/api/comment/approved").permitAll()
                        .requestMatchers(HttpMethod.PUT,"/api/comment/{id}/status","/api/comment/{id}/adminstatus").permitAll()
                        .requestMatchers(HttpMethod.GET,"/api/comment/adminstatus/true").permitAll()
                        .anyRequest().authenticated()
                );
        return http.build();
    }

    @Bean
    UserDetailsService userDetailsService() {
        return username -> userRepo.findByUsername(username).orElseThrow();
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
    return configuration.getAuthenticationManager();
}
@Bean
    PasswordEncoder passwordEncoder(){
    return new BCryptPasswordEncoder();
}
}
