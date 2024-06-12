package org.example.backend.service;

import org.example.backend.entity.Enquiry;
import org.example.backend.entity.Tour;

import java.util.List;

import org.example.backend.dto.TourDto;
import org.example.backend.entity.Tour;

import java.util.List;

public interface TourService {
    Tour addTour(TourDto tourDto);
    List<Tour> getTours();

    List<Tour> getAllTours();
}
