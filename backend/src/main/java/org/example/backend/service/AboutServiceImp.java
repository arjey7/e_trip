package org.example.backend.service;

import org.example.backend.entity.About;
import org.example.backend.repository.AboutRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class AboutServiceImp implements AboutService {

    private final AboutRepo aboutRepo;

    @Autowired
    public AboutServiceImp(AboutRepo aboutRepo) {
        this.aboutRepo = aboutRepo;
    }

    @Override
    public About createAbout(About about) {
        return aboutRepo.save(about);
    }

    @Override
    public About getAboutById(UUID id) {
        return aboutRepo.findById(id).orElseThrow(() -> new RuntimeException("About not found"));
    }

    @Override
    public List<About> getAllAbouts() {
        return aboutRepo.findAll();
    }
}
