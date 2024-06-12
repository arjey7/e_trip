package org.example.backend.service;

import org.example.backend.dto.TourDayDto;
import org.example.backend.entity.TourDay;

import java.util.List;

public interface TourDayService {
    TourDay addTourDay(TourDayDto tourDayDto);
    List<TourDay> getAllTourDays(); // New method
}
