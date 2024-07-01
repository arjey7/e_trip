package org.example.backend.repository;

import org.example.backend.entity.Text;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface TextRepo extends JpaRepository<Text, UUID> {
    @Query(value = "SELECT * FROM text WHERE tour_Id = :tourId", nativeQuery = true)
    List<Text>findTextByTourId(UUID tourId);

}
