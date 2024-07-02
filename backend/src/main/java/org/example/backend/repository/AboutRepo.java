package org.example.backend.repository;

import org.example.backend.entity.About;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface AboutRepo extends JpaRepository<About, UUID> {
    @Query(value = "SELECT * FROM about WHERE tour_id = :tourId", nativeQuery = true)
    List<About> findAboutByTourId(UUID tourId);

    @Query(value = "select start_time,json_agg(jsonb_build_object('start_time',start_time,'end_time',end_time,'price',price))from about\n" +
            "group by start_time order by start_time",nativeQuery = true)
    List<Object[]> getByDestination();
}
