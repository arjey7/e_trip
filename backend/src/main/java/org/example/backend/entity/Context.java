package org.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Context {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;
    private String text;
    private Integer priceByn;
    private Integer priceEur;
    @ManyToOne
    @JoinColumn(name = "tour_id", nullable = false)
    private Tour tour;
}
