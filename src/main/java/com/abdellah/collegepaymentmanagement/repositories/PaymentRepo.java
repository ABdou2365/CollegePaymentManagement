package com.abdellah.collegepaymentmanagement.repositories;

import com.abdellah.collegepaymentmanagement.entities.Payment;
import com.abdellah.collegepaymentmanagement.entities.PaymentStatus;
import com.abdellah.collegepaymentmanagement.entities.PaymentType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepo extends JpaRepository<Payment, Long> {
    
    List<Payment> findByStudent_Code(String studentCode);
    List<Payment> findByPaymentStatus(PaymentStatus paymentStatus);
    List<Payment> findByPaymentType(PaymentType paymentType);
}
