package com.abdellah.collegepaymentmanagement.web;

import com.abdellah.collegepaymentmanagement.entities.Payment;
import com.abdellah.collegepaymentmanagement.entities.PaymentStatus;
import com.abdellah.collegepaymentmanagement.entities.PaymentType;
import com.abdellah.collegepaymentmanagement.entities.Student;
import com.abdellah.collegepaymentmanagement.repositories.PaymentRepo;
import com.abdellah.collegepaymentmanagement.repositories.StudentRepo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PaymentRestController {

    private final PaymentRepo paymentRepo;

    private final StudentRepo studentRepo;

    public PaymentRestController(PaymentRepo paymentRepo, StudentRepo studentRepo) {
        this.paymentRepo = paymentRepo;
        this.studentRepo = studentRepo;
    }

    @GetMapping("/payments")
    public List<Payment> getAllPayments() {
        return paymentRepo.findAll();
    }

    @GetMapping("/payment/{id}")
    public Payment getPaymentById(@PathVariable Long id) {
        return paymentRepo.findById(id).orElse(null);
    }


    @GetMapping("/students/{code}/payments")
    public List<Payment> getPaymentsByStudent(@PathVariable String code) {
        return paymentRepo.findByStudent_Code(code);
    }

    @GetMapping("/paymentsByStatus")
    public List<Payment> getPaymentsByStatus (@RequestParam PaymentStatus status) {
        return paymentRepo.findByPaymentStatus(status);
    }

    @GetMapping("/paymentsByType")
    public List<Payment> getPaymentsByStatus (@RequestParam PaymentType type) {
        return paymentRepo.findByPaymentType(type);
    }

    @GetMapping("/students")
    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }

    @GetMapping("/students/{id}")
    public Student getStudentById(@PathVariable String id) {
        return studentRepo.findById(id).orElse(null);
    }

    @GetMapping("/students/{code}")
    public List<Student> getStudentByCode(@PathVariable String code) {
        return studentRepo.findByCode(code);
    }

    @GetMapping("/studentsByProgramId")
    public List<Student> getStudentsByProgramId(String programId) {
        return studentRepo.findByProgramId(programId);
    }




}
