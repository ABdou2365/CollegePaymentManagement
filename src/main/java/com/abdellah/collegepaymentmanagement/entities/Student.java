package com.abdellah.collegepaymentmanagement.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@AllArgsConstructor @NoArgsConstructor @Getter @Setter
@Builder @ToString
public class Student {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    @Column(unique = true)
    private String code;
    private String programCode;
    private String programId;
    private String Photo;
}
