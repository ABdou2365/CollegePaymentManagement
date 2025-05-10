package com.abdellah.collegepaymentmanagement.services;


import com.abdellah.collegepaymentmanagement.dtos.NewPaymentDTO;
import com.abdellah.collegepaymentmanagement.entities.Payment;
import com.abdellah.collegepaymentmanagement.entities.PaymentStatus;
import com.abdellah.collegepaymentmanagement.entities.PaymentType;
import com.abdellah.collegepaymentmanagement.entities.Student;
import com.abdellah.collegepaymentmanagement.repositories.PaymentRepo;
import com.abdellah.collegepaymentmanagement.repositories.StudentRepo;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class PaymentService {

    private PaymentRepo paymentRepo;
    private StudentRepo studentRepo;

    public PaymentService(PaymentRepo paymentRepo, StudentRepo studentRepo) {
        this.paymentRepo = paymentRepo;
        this.studentRepo = studentRepo;
    }

    public List<Payment> getAllPayments() {
        return paymentRepo.findAll();
    }

    public Payment getPaymentById(@PathVariable Long id) {
        return paymentRepo.findById(id).orElse(null);
    }

    public Payment changePaymentStatus(@PathVariable Long id, PaymentStatus status) {
        Payment payment = paymentRepo.findById(id).get();
        payment.setPaymentStatus(status);
        return paymentRepo.save(payment);
    }

    public Payment createPayment(@RequestParam MultipartFile file, NewPaymentDTO newPaymentDTO) throws IOException {
        Path folderPath = Paths.get(System.getProperty("user.home"),"collegePayment-management","src","main","resources","payments");
        if (!Files.exists(folderPath)) {
            Files.createDirectories(folderPath);
        }
        String fileName = UUID.randomUUID().toString()+".pdf";
        Path filePath = Paths.get(System.getProperty("user.home"),
                "collegePayment-management","src","main","resources","payments",fileName);
        Files.copy(file.getInputStream(), filePath);
        Student student = studentRepo.findByCode(newPaymentDTO.code());
        Payment payment = Payment.builder()
                .file(filePath.toUri().toString())
                .date(newPaymentDTO.date())
                .amount(newPaymentDTO.amount())
                .paymentType(newPaymentDTO.paymentType())
                .paymentStatus(PaymentStatus.CREATED)
                .student(student)
                .build();
        return paymentRepo.save(payment);
    }

    public byte[] viewPaymentFileById(@PathVariable  Long id) throws IOException {
        Payment payment = paymentRepo.findById(id).get();
        return Files.readAllBytes(Path.of(URI.create(payment.getFile())));
    }

    public List<Payment> getPaymentsByStudent(@PathVariable String code) {
        return paymentRepo.findByStudent_Code(code);
    }

    public List<Payment> getPaymentsByStatus (@RequestParam PaymentStatus status) {
        return paymentRepo.findByPaymentStatus(status);
    }

    public List<Payment> getPaymentsByType (@RequestParam PaymentType type) {
        return paymentRepo.findByPaymentType(type);
    }

    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }

    public Student getStudentByCode(@PathVariable String code) {
        return studentRepo.findByCode(code);
    }

    public List<Student> getStudentsByProgramId(String programId) {
        return studentRepo.findByProgramId(programId);
    }
}
