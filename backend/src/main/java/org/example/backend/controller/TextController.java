package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.TextDto;
import org.example.backend.entity.Text;
import org.example.backend.service.TextService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/texts")
@RequiredArgsConstructor
public class TextController {
    private final TextService textService;

    @GetMapping("/{tourId}")
    public ResponseEntity<List<Text>> getTexts(@PathVariable UUID tourId) {
        return ResponseEntity.ok(textService.getById(tourId));
    }

    @PostMapping("/{tourId}")
    public ResponseEntity<Text> addText(@PathVariable UUID tourId, @RequestBody TextDto textDto) {
        Text text = textService.postById(tourId, textDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(text);
    }
}
