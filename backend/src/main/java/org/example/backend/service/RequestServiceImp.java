package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.RequestDto;
import org.example.backend.entity.Request;
import org.example.backend.repository.RequestRepo;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RequestServiceImp implements RequestService {

    private final RequestRepo requestRepo;

    @Override
    public Request saveRequest(RequestDto requestDto) {
        Request request = new Request();
        request.setFullName(requestDto.fullName());
        request.setPhoneNumber(requestDto.phoneNumber());
        return requestRepo.save(request);
    }
}
