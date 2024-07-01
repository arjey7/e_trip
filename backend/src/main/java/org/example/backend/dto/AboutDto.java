package org.example.backend.dto;

import java.time.LocalDate;

public record AboutDto (LocalDate startTime, LocalDate endTime, Double price){
}
