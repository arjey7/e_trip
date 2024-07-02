package org.example.backend.service;

import org.example.backend.dto.AboutDto;
import org.example.backend.entity.About;

import java.util.List;
import java.util.UUID;

public interface AboutService {
    About postById(UUID tourId, AboutDto aboutDto);
    List<About> getAboutById(UUID tourId);
}
