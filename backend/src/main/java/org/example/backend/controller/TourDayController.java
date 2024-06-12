package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.TourDayDto;
import org.example.backend.entity.TourDay;
import org.example.backend.service.TourDayService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tourDay")
public class TourDayController {

    private final TourDayService tourDayService;

    @PostMapping
    public HttpEntity<?> addTourDay(@RequestBody TourDayDto tourDayDto) {
        System.out.println(tourDayDto);
        TourDay addedTourDay = tourDayService.addTourDay(tourDayDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedTourDay);
    }
    @GetMapping
    public ResponseEntity<List<TourDay>> getAllTourDays() {
        List<TourDay> tourDays = tourDayService.getAllTourDays();
        return ResponseEntity.ok(tourDays);
    }
}
