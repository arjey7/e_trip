package org.example.backend.service;

import org.example.backend.dto.ContextDto;
import org.example.backend.dto.DestinationDto;
import org.example.backend.entity.Context;
import org.example.backend.entity.Destination;

import java.util.List;
import java.util.UUID;

public interface ContextService {
    List<Context> getById(UUID tourId);
    Context postById(UUID tourId, ContextDto contextDto);

}
