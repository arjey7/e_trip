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
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

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

    @GetMapping("/dest")
    public List<Map<String, Object>> getDestinationsByDay() {
        List<Object[]> results = destinationRepo.getByDestination();
        return results.stream().map(row -> Map.of("day", row[0], "destinations", row[1])).collect(Collectors.toList());
    }

}
