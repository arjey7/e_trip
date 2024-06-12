package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.entity.Enquiry;
import org.example.backend.entity.Tour;
import org.example.backend.repository.EnquiryRepo;
import org.example.backend.repository.TourRepo;
import org.example.backend.dto.TourDto;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public List<Tour> getTours() {
        return tourRepo.findAll();
    }


    @Override
    public List<Tour> getAllTours() {
        return tourRepo.findAll();
    }

}
