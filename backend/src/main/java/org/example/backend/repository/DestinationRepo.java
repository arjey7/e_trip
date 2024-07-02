package org.example.backend.repository;

import org.example.backend.dto.DestinationDto;
import org.example.backend.entity.Destination;
import org.example.backend.entity.TourDay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface DestinationRepo extends JpaRepository<Destination, UUID> {
    @Query(value = "SELECT * FROM destination WHERE tour_Id = :tourId", nativeQuery = true)
    List<Destination> findDestinationByTourId( UUID tourId);
    @Query(value = "SELECT * FROM destination WHERE day = :day", nativeQuery = true)
    List<Destination> getAllByDay2(Integer day);
    @Query(value = "select day,json_agg(jsonb_build_object('day',day,'data',data,'text',text))from destination\n" +
            "group by day order by day",nativeQuery = true)
    List<Object[]> getByDestination();
}
