package org.example.backend.service;

import org.example.backend.dto.TourDayDto;
import org.example.backend.entity.TourDay;

import java.util.List;
import java.util.UUID;

public interface TourDayService {
    TourDay addTourDay(TourDayDto tourDayDto);
    List<TourDay> getAllTourDays();
    TourDay updateTourDay(UUID id, TourDayDto tourDayDto); // New method
    void deleteTourDay(UUID id); // New method

    List<TourDay> getById(UUID tourId);
}
