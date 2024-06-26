package org.example.backend.repository;

import org.example.backend.entity.Request;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RequestRepo extends JpaRepository<Request, UUID> {
}
