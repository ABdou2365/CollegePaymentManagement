package com.abdellah.collegepaymentmanagement.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@AllArgsConstructor @NoArgsConstructor @Builder @Getter
@Setter @ToString
public class Payment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate date;
    private double amount;
    private PaymentType paymentType;
    private PaymentStatus paymentStatus;
    private String file;
    @ManyToOne
    private Student student;
}
