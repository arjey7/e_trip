package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.entity.Enquiry;
import org.example.backend.service.EnquiryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/enquiry")
public class EnquiryController {
    private final EnquiryService enquiryService;

    @PostMapping
    public ResponseEntity<Enquiry> createEnquiry(@RequestBody Enquiry enquiry) {
        System.out.println(enquiry);
        Enquiry savedEnquiry = enquiryService.saveEnquiry(enquiry);
        return ResponseEntity.ok(savedEnquiry);
    }


    @GetMapping("/{idd}")
    public ResponseEntity<List<Enquiry>> getAllEnquiries(@PathVariable UUID idd) {
        List<Enquiry> enquiries = enquiryService.getAllEnquiries(idd);
        return ResponseEntity.ok(enquiries);
    }

    @PatchMapping("/{id}/answer")
    public ResponseEntity<Enquiry> updateEnquiryAnswer(@PathVariable UUID id, @RequestBody String answer) {
        Enquiry updatedEnquiry = enquiryService.updateEnquiryAnswer(id, answer);
        return ResponseEntity.ok(updatedEnquiry);
    }
}
