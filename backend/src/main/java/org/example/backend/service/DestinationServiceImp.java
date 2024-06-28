package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.entity.Destination;
import org.example.backend.entity.TourDay;
import org.example.backend.repository.DestinationRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DestinationServiceImp implements DestinationService{
  final DestinationRepo destinationsRepo;
    @Override
    public List<Destination> getById(UUID tourId) {
        return destinationsRepo.findDestinationByTourId(tourId);
    }
}
