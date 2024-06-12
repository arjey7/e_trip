package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.TourDto;
import org.example.backend.entity.Tour;
import org.example.backend.service.TourService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tour")
public class TourController {

    private final TourService tourService;

    @PostMapping
    public HttpEntity<?> addTour(@RequestBody TourDto tourDto) {
        System.out.println(tourDto);
        Tour addedTour = tourService.addTour(tourDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedTour);
    }
    @GetMapping("/gettour")
    public HttpEntity<List<Tour>> getTours() {
        List<Tour> tours = tourService.getTours();
        return ResponseEntity.ok(tours);
    }


    @GetMapping("/getAll")
    public ResponseEntity<List<Tour>> getAllTours() {
        List<Tour> tours = tourService.getAllTours();
        return ResponseEntity.ok(tours);
    }
}
