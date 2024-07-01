package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.DestinationDto;
import org.example.backend.entity.Destination;
import org.example.backend.entity.Tour;
import org.example.backend.entity.TourDay;
import org.example.backend.repository.DestinationRepo;
import org.example.backend.service.DestinationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/destination")
@RequiredArgsConstructor
public class DestinationController {
    final DestinationService destinationsService;
    final DestinationRepo destinationRepo;
    @GetMapping("/{tourId}")
    public List<Destination> getTourDay(@PathVariable UUID tourId) {
        List<Destination> destinationsServiceById = destinationsService.getById(tourId);
        return destinationsServiceById;
    }
    @PostMapping("/{tourId}")
    public Destination postTour(@PathVariable UUID tourId, @RequestBody DestinationDto destinationDto){
        Destination destination = destinationsService.postById(tourId, destinationDto);
        return destination;
    }

}
