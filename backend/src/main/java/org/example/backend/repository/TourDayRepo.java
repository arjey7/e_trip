package org.example.backend.repository;

import org.example.backend.entity.TourDay;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TourDayRepo extends JpaRepository<TourDay, UUID> {
}
