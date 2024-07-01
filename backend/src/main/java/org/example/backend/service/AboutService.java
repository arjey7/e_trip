package org.example.backend.service;

import org.example.backend.entity.About;

import java.util.List;
import java.util.UUID;

public interface AboutService {
    About createAbout(About about);
    About getAboutById(UUID id);
    List<About> getAllAbouts();
}
