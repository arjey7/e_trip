package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.ContextDto;
import org.example.backend.dto.DestinationDto;
import org.example.backend.entity.Context;
import org.example.backend.entity.Destination;
import org.example.backend.entity.Tour;
import org.example.backend.repository.ContextRepo;
import org.example.backend.repository.TourRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ContextServiceImp implements ContextService{
    final ContextRepo contextRepo;
    final TourRepo tourRepo;
    @Override
    public List<Context> getById(UUID tourId) {
        return contextRepo.findDestinationByTourId(tourId);
    }
    @Override
    public Context postById(UUID tourId, ContextDto contextDto) {
        Tour tour = tourRepo.findById(tourId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid tourId: " + tourId));
        Context context = new Context(UUID.randomUUID(), contextDto.text(), contextDto.priceByn(), contextDto.priceEur(), tour);
        return contextRepo.save(context);
    }

}
