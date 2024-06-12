package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.TourDayDto;
import org.example.backend.entity.TourDay;
import org.example.backend.repository.TourDayRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TourDayServiceImp implements TourDayService {

    private final TourDayRepo tourDayRepo;

    @Override
    public TourDay addTourDay(TourDayDto tourDayDto) {
        TourDay tourDay = new TourDay();
        tourDay.setTitle(tourDayDto.title());
        tourDay.setDescription(tourDayDto.description());
        tourDay.setPhoto(tourDayDto.photo());
        tourDay.setTourId(tourDayDto.tourId());
        return tourDayRepo.save(tourDay);
    }

    @Override
    public List<TourDay> getAllTourDays() {
        return tourDayRepo.findAll();
    }
}
