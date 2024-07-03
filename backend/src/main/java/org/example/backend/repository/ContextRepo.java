package org.example.backend.repository;

import org.example.backend.entity.Context;
import org.example.backend.entity.Destination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface ContextRepo extends JpaRepository<Context, UUID> {
    @Query(value = "SELECT * FROM context WHERE tour_Id = :tourId", nativeQuery = true)
    List<Context> findDestinationByTourId(UUID tourId);
}
