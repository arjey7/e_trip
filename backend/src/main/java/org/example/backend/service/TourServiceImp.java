package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.TourDto;
import org.example.backend.entity.Tour;
import org.example.backend.repository.TourRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TourServiceImp implements TourService {

    private final TourRepo tourRepo;

    @Override
    public Tour addTour(TourDto tourDto) {
        Tour tour = new Tour();
        tour.setTitle(tourDto.title());
        tour.setDescription(tourDto.description());
        tour.setDescription2(tourDto.description2());
        tour.setPhoto(tourDto.photo());
        tour.setVidio(tourDto.vidio());
        tour.setDay(tourDto.day());
        tour.setCost(tourDto.cost());
        return tourRepo.save(tour);
    }


    @Override
    public List<Tour> getAllTours() {
        return tourRepo.findAll();
    }

    @Override
    public Tour updateTour(UUID id, TourDto tourDto) {
        Optional<Tour> existingTourOptional = tourRepo.findById(id);
        if (existingTourOptional.isPresent()) {
            Tour existingTour = existingTourOptional.get();
            existingTour.setTitle(tourDto.title());
            existingTour.setDescription(tourDto.description());
            existingTour.setDescription2(tourDto.description2());
            existingTour.setPhoto(tourDto.photo());
            existingTour.setVidio(tourDto.vidio());
            existingTour.setDay(tourDto.day());
            existingTour.setCost(tourDto.cost());
            return tourRepo.save(existingTour);
        } else {
            throw new RuntimeException("Tour not found");
        }
    }

    @Override
    public void deleteTour(UUID id) {
        if (tourRepo.existsById(id)) {
            tourRepo.deleteById(id);
        } else {
            throw new RuntimeException("Tour not found");
        }
    }
}
