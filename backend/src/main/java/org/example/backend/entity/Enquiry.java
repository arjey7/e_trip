package org.example.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "enquiries")
public class Enquiry {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(columnDefinition = "uuid DEFAULT gen_random_uuid()")
    private UUID id;
    private String fullName;
    private String phoneNumber;
    @Pattern(regexp = "^[a-zW-Z0-9._%+-]+@gmail\\.com$")
    private String email;
    private String text;
    private String tourName;
    private String answer;
}
