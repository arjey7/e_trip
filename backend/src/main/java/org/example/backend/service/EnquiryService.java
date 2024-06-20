package org.example.backend.service;

import org.example.backend.entity.Enquiry;

import java.util.List;
import java.util.UUID;

public interface EnquiryService {
    Enquiry saveEnquiry(Enquiry enquiry);
    List<Enquiry> getAllEnquiries(UUID idd);
    Enquiry updateEnquiryAnswer(UUID id, String answer);

}

