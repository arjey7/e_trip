package org.example.backend.dto;

public record TourDto(String title,String description,String description2,String photo,String vidio,Integer day,Double cost) {
    public String video() {
        return vidio;
    }
}
