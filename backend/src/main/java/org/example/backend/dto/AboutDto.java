package org.example.backend.dto;

import java.time.LocalDate;
import java.util.UUID;

public record AboutDto (LocalDate startTime, LocalDate endTime, Double price, UUID tourId){
}
