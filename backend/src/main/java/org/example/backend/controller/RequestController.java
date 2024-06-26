package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.RequestDto;
import org.example.backend.entity.Request;
import org.example.backend.service.RequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/request")
public class RequestController {

    private final RequestService requestService;

    @PostMapping
    public ResponseEntity<Request> saveRequest(@RequestBody RequestDto requestDto) {
        Request savedRequest = requestService.saveRequest(requestDto);
        return ResponseEntity.ok(savedRequest);
    }
}
