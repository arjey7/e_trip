package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.entity.Destination;
import org.example.backend.entity.TourDay;
import org.example.backend.service.DestinationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/destination")
@RequiredArgsConstructor
public class DestinationController {
    final DestinationService destinationsService;
    @GetMapping("/{tourId}")
    public List<Destination> getTourDay(@PathVariable UUID tourId) {
        List<Destination> destinationsServiceById = destinationsService.getById(tourId);
        return destinationsServiceById;
    }
}
