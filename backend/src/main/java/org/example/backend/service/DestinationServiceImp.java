package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.DestinationDto;
import org.example.backend.entity.Destination;
import org.example.backend.entity.Tour;
import org.example.backend.repository.DestinationRepo;
import org.example.backend.repository.TourRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DestinationServiceImp implements DestinationService{
  final DestinationRepo destinationsRepo;
  final TourRepo tourRepo;
    @Override
    public List<Destination> getById(UUID tourId) {
        return destinationsRepo.findDestinationByTourId(tourId);
    }



    @Override
    public Destination postById(UUID tourId, DestinationDto destinationDto) {
        Tour tour = tourRepo.findById(tourId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid tourId: " + tourId));
        Destination destination = new Destination(UUID.randomUUID(), destinationDto.day(), destinationDto.data(), destinationDto.text(), tour);
        return destinationsRepo.save(destination);
    }
}
