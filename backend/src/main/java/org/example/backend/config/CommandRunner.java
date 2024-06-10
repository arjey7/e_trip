package org.example.backend.config;

import lombok.RequiredArgsConstructor;
import org.example.backend.entity.Role;
import org.example.backend.entity.User;
import org.example.backend.repository.RoleRepo;
import org.example.backend.repository.UserRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Configuration
@RequiredArgsConstructor

public class CommandRunner implements CommandLineRunner {
    final UserRepo userRepo;
    final RoleRepo roleRepo;
    final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        List<User> all = userRepo.findAll();
        if (all.isEmpty()) {
            List<Role> roles = roleRepo.saveAll(List.of(new Role("ROLE_ADMIN")));
            userRepo.save(new User("admin",passwordEncoder.encode("12345"),roles));

        }
    }
}
