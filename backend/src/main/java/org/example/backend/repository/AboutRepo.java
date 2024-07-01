package org.example.backend.repository;

import org.example.backend.entity.About;
import org.example.backend.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AboutRepo extends JpaRepository<About, UUID> {
}
