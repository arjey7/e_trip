package org.example.backend.repository;

import org.example.backend.entity.Destination;
import org.example.backend.entity.TourDay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface DestinationRepo extends JpaRepository<Destination, UUID> {
    @Query(value = "SELECT * FROM destination WHERE tour_Id = :tourId", nativeQuery = true)
    List<Destination> findDestinationByTourId( UUID tourId);
}
