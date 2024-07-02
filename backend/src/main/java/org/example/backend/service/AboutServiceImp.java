package org.example.backend.service;

import org.example.backend.dto.AboutDto;
import org.example.backend.entity.About;
import org.example.backend.entity.Tour;
import org.example.backend.repository.AboutRepo;
import org.example.backend.repository.TourRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class AboutServiceImp implements AboutService {

    private final AboutRepo aboutRepo;
    private final TourRepo tourRepo;  // Added TourRepo

    @Autowired
    public AboutServiceImp(AboutRepo aboutRepo, TourRepo tourRepo) {
        this.aboutRepo = aboutRepo;
        this.tourRepo = tourRepo;
    }

    @Override
    public About postById(UUID tourId, AboutDto aboutDto) {
        Tour tour = tourRepo.findById(tourId)
                .orElseThrow(() -> new IllegalArgumentException("Tour not found: " + tourId));
        About about = new About(UUID.randomUUID(), aboutDto.startTime(), aboutDto.endTime(), aboutDto.price(), tour);
        return aboutRepo.save(about);
    }

    @Override
    public List<About> getAboutById(UUID tourId) {
        System.out.println("Tour ID: " + tourId);
        return aboutRepo.findAboutByTourId(tourId);
    }
}
