package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.entity.Enquiry;
import org.example.backend.entity.Tour;
import org.example.backend.repository.EnquiryRepo;
import org.example.backend.repository.TourRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TourServiceImp implements TourService{
    private final TourRepo tourRepo;

    @Override
    public List<Tour> getAllTours() {
        return tourRepo.findAll();
    }

}
