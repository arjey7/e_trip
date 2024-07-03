package org.example.backend.service;

import org.example.backend.dto.DestinationDto;
import org.example.backend.dto.TourDayDto;
import org.example.backend.entity.Destination;
import org.example.backend.entity.TourDay;

import java.util.List;
import java.util.UUID;

public interface DestinationService {
    List<Destination> getById(UUID tourId);

    Destination postById(UUID tourId, DestinationDto destinationDto);

    Destination update(UUID id, DestinationDto destinationDto);
    void delete(UUID id);
}
