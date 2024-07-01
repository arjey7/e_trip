package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.TextDto;
import org.example.backend.entity.Text;
import org.example.backend.entity.Tour;
import org.example.backend.repository.TextRepo;
import org.example.backend.repository.TourRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TextServiceImp implements TextService {
    final TourRepo tourRepo;
    final TextRepo textRepo;

    @Override
    public List<Text> getById(UUID tourId) {
        return textRepo.findTextByTourId(tourId);
    }

    @Override
    public Text postById(UUID tourId, TextDto textDto) {
        Tour tour = tourRepo.findById(tourId).orElseThrow(() -> new IllegalArgumentException("Tour not found: " + tourId));
        Text text = new Text(UUID.randomUUID(), textDto.text(), tour);
        return textRepo.save(text);
    }
}
