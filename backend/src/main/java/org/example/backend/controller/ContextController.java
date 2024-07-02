package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.ContextDto;
import org.example.backend.dto.DestinationDto;
import org.example.backend.entity.Context;
import org.example.backend.entity.Destination;
import org.example.backend.service.ContextService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
@RestController
@RequestMapping("/api/context")
@RequiredArgsConstructor
public class ContextController {
    final ContextService contextService;
    @GetMapping("/{tourId}")
    public List<Context> getTourDay(@PathVariable UUID tourId) {
        List<Context> contexts = contextService.getById(tourId);
        return contexts;
    }
    @PostMapping("/{tourId}")
    public Context postTour(@PathVariable UUID tourId, @RequestBody ContextDto contextDto){
        Context context = contextService.postById(tourId, contextDto);
        return context;
    }
}
