package com.abdellah.collegepaymentmanagement.web;

import com.abdellah.collegepaymentmanagement.entities.Payment;
import com.abdellah.collegepaymentmanagement.entities.PaymentStatus;
import com.abdellah.collegepaymentmanagement.entities.PaymentType;
import com.abdellah.collegepaymentmanagement.entities.Student;
import com.abdellah.collegepaymentmanagement.repositories.PaymentRepo;
import com.abdellah.collegepaymentmanagement.repositories.StudentRepo;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

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

    @PutMapping("payment/{id}")
    public Payment changePaymentStatus(@PathVariable Long id, PaymentStatus status) {
        Payment payment = paymentRepo.findById(id).get();
        payment.setPaymentStatus(status);
        return paymentRepo.save(payment);
    }

    @PostMapping(path = "payment",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Payment createPayment(@RequestParam MultipartFile file, LocalDate date,double amount,PaymentType paymentType,PaymentStatus status,
                                 String code) throws IOException {
        Path folderPath = Paths.get(System.getProperty("user.home"),"collegePayment-management","src","main","resources","payments");
        if (!Files.exists(folderPath)) {
            Files.createDirectories(folderPath);
        }
        String fileName = UUID.randomUUID().toString()+".pdf";
        Path filePath = Paths.get(System.getProperty("user.home"),
                "collegePayment-management","src","main","resources","payments",fileName);
        Files.copy(file.getInputStream(), filePath);
        Student student = studentRepo.findByCode(code);
        Payment payment = Payment.builder()
                .file(filePath.toUri().toString())
                .date(date)
                .amount(amount)
                .paymentType(paymentType)
                .paymentStatus(status)
                .student(student)
                .build();
        return paymentRepo.save(payment);
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

//    @GetMapping("/students/{id}")
//    public Student getStudentById(@PathVariable String id) {
//        return studentRepo.findById(id).orElse(null);
//    }

    @GetMapping("/students/{code}")
    public Student getStudentByCode(@PathVariable String code) {
        return studentRepo.findByCode(code);
    }

    @GetMapping("/studentsByProgramId")
    public List<Student> getStudentsByProgramId(String programId) {
        return studentRepo.findByProgramId(programId);
    }
}
