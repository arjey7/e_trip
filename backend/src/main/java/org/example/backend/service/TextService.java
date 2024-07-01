package org.example.backend.service;

import org.example.backend.dto.DestinationDto;
import org.example.backend.dto.TextDto;
import org.example.backend.entity.Destination;
import org.example.backend.entity.Text;

import java.util.List;
import java.util.UUID;

public interface TextService {
    List<Text> getById(UUID tourId);
    Text postById(UUID tourId, TextDto textDto);
}
