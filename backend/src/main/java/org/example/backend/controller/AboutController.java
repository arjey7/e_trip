package org.example.backend.controller;

import org.example.backend.dto.AboutDto;
import org.example.backend.entity.About;
import org.example.backend.repository.AboutRepo;
import org.example.backend.service.AboutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/about")
public class AboutController {

    private final AboutService aboutService;
    private final AboutRepo aboutRepo;

    @Autowired
    public AboutController(AboutService aboutService, AboutRepo aboutRepo) {
        this.aboutService = aboutService;
        this.aboutRepo = aboutRepo;
    }

    @PostMapping("/{tourId}")
    public ResponseEntity<About> createAbout(@PathVariable UUID tourId, @RequestBody AboutDto aboutDto) {
        About createdAbout = aboutService.postById(tourId, aboutDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAbout);  // Return ResponseEntity with createdAbout
    }

    @GetMapping("/{tourId}")
    public List<About> getAbout(@PathVariable UUID tourId) {
        List<About> about = aboutService.getAboutById(tourId);
        return about;
    }

    @GetMapping("/ab")
    public List<Map<String, Object>> getDestinationsByDay() {
        List<Object[]> results = aboutRepo.getByDestination();
        return results.stream().map(row -> Map.of("start_time", row[0], "abouts", row[1])).collect(Collectors.toList());
    }

}
