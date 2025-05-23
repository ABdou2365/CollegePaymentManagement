package com.abdellah.collegepaymentmanagement.web;

import com.abdellah.collegepaymentmanagement.dtos.NewPaymentDTO;
import com.abdellah.collegepaymentmanagement.entities.Payment;
import com.abdellah.collegepaymentmanagement.entities.PaymentStatus;
import com.abdellah.collegepaymentmanagement.entities.PaymentType;
import com.abdellah.collegepaymentmanagement.entities.Student;
import com.abdellah.collegepaymentmanagement.services.PaymentService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin("*")
public class PaymentRestController {

    private final PaymentService paymentService;

    public PaymentRestController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping("/payments")
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @GetMapping("/payment/{id}")
    public Payment getPaymentById(@PathVariable Long id) {
        return paymentService.getPaymentById(id);
    }

    @PutMapping("payment/{id}")
    public Payment changePaymentStatus(@PathVariable Long id, PaymentStatus status) {
        return paymentService.changePaymentStatus(id, status);
    }

    @PostMapping(path = "payment",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Payment createPayment(@RequestParam("file") MultipartFile file, NewPaymentDTO newPaymentDTO) throws IOException {
        return paymentService.createPayment(file, newPaymentDTO);
    }

    @GetMapping(path = "paymentFile/{id}",produces = MediaType.APPLICATION_PDF_VALUE)
    public byte[] viewPaymentFileById(@PathVariable  Long id) throws IOException {
        return paymentService.viewPaymentFileById(id);
    }



    @GetMapping("/students/{code}/payments")
    public List<Payment> getPaymentsByStudent(@PathVariable String code) {
        return paymentService.getPaymentsByStudent(code);
    }

    @GetMapping("/paymentsByStatus")
    public List<Payment> getPaymentsByStatus (@RequestParam PaymentStatus status) {
        return paymentService.getPaymentsByStatus(status);
    }

    @GetMapping("/paymentsByType")
    public List<Payment> getPaymentsByType (@RequestParam PaymentType type) {
        return paymentService.getPaymentsByType(type);
    }

    @GetMapping("/students")
    public List<Student> getAllStudents() {
        return paymentService.getAllStudents();
    }

//    @GetMapping("/students/{id}")
//    public Student getStudentById(@PathVariable String id) {
//        return studentRepo.findById(id).orElse(null);
//    }

    @GetMapping("/students/{code}")
    public Student getStudentByCode(@PathVariable String code) {
        return paymentService.getStudentByCode(code);
    }

    @GetMapping("/studentsByProgramId")
    public List<Student> getStudentsByProgramId(String programId) {
        return paymentService.getStudentsByProgramId(programId);
    }
}
