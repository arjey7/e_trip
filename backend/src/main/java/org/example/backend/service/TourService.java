package org.example.backend.service;

import org.example.backend.entity.Enquiry;
import org.example.backend.entity.Tour;

import java.util.List;

public interface TourService {
    List<Tour> getAllTours();
}
