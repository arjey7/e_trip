package org.example.backend.service;

import org.example.backend.entity.Destination;
import org.example.backend.entity.TourDay;

import java.util.List;
import java.util.UUID;

public interface DestinationService {
    List<Destination> getById(UUID tourId);
}
