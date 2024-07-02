package org.example.backend.controller;

import org.example.backend.dto.AboutDto;
import org.example.backend.entity.About;
import org.example.backend.service.AboutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/about")
public class AboutController {

    private final AboutService aboutService;

    @Autowired
    public AboutController(AboutService aboutService) {
        this.aboutService = aboutService;
    }

    @PostMapping
    public ResponseEntity<About> createAbout(@RequestBody AboutDto aboutDto) {
        About about = new About();
        about.setStartTime(aboutDto.startTime());
        about.setEndTime(aboutDto.endTime());
        about.setPrice(aboutDto.price());
        About createdAbout = aboutService.createAbout(about);
        return ResponseEntity.ok(createdAbout);
    }

    @GetMapping("/{id}")
    public ResponseEntity<About> getAbout(@PathVariable UUID id) {
        About about = aboutService.getAboutById(id);
        return ResponseEntity.ok(about);
    }

    @GetMapping
    public ResponseEntity<List<About>> getAllAbouts() {
        List<About> abouts = aboutService.getAllAbouts();
        return ResponseEntity.ok(abouts);
    }
}
