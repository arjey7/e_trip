package org.example.backend.service;

import org.example.backend.dto.RequestDto;
import org.example.backend.entity.Request;

public interface RequestService {
    Request saveRequest(RequestDto requestDto);
}
