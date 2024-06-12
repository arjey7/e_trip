package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.TourDayDto;
import org.example.backend.entity.TourDay;
import org.example.backend.repository.TourDayRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

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

    @Override
    public TourDay updateTourDay(UUID id, TourDayDto tourDayDto) {
        TourDay existingTourDay = tourDayRepo.findById(id).orElseThrow(() -> new RuntimeException("TourDay not found"));
        existingTourDay.setTitle(tourDayDto.title());
        existingTourDay.setDescription(tourDayDto.description());
        existingTourDay.setPhoto(tourDayDto.photo());
        existingTourDay.setTourId(tourDayDto.tourId());
        return tourDayRepo.save(existingTourDay);
    }

    @Override
    public void deleteTourDay(UUID id) {
        if (!tourDayRepo.existsById(id)) {
            throw new RuntimeException("TourDay not found");
        }
        tourDayRepo.deleteById(id);
    }
}
