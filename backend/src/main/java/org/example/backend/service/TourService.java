package org.example.backend.service;

import org.example.backend.dto.TourDto;
import org.example.backend.entity.Tour;

import java.util.List;
import java.util.UUID;

public interface TourService {
    Tour addTour(TourDto tourDto);
    List<Tour> getTours();
    Tour updateTour(UUID id, TourDto tourDto); // New method
    void deleteTour(UUID id); // New method
}
