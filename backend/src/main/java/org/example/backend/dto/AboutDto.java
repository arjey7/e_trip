package org.example.backend.dto;

import java.time.LocalDateTime;

public record AboutDto (LocalDateTime startTime, LocalDateTime endTime, Double price){
}
