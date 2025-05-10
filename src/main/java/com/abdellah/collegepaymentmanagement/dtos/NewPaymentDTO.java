package com.abdellah.collegepaymentmanagement.dtos;

import com.abdellah.collegepaymentmanagement.entities.PaymentType;

import java.time.LocalDate;

public record NewPaymentDTO(LocalDate date, double amount, PaymentType paymentType,
                            String code) {
}
