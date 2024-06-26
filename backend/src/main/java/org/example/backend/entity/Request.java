package org.example.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "uuid DEFAULT gen_random_uuid()")
    private UUID id;
    private String fullName;
    private String phoneNumber;
}
