package com.abdellah.collegepaymentmanagement;

import com.abdellah.collegepaymentmanagement.entities.Payment;
import com.abdellah.collegepaymentmanagement.entities.PaymentStatus;
import com.abdellah.collegepaymentmanagement.entities.PaymentType;
import com.abdellah.collegepaymentmanagement.entities.Student;
import com.abdellah.collegepaymentmanagement.repositories.PaymentRepo;
import com.abdellah.collegepaymentmanagement.repositories.StudentRepo;
import org.apache.catalina.core.ApplicationContext;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;
import java.util.Random;

@SpringBootApplication
public class CollegePaymentManagementApplication {

	public static void main(String[] args) {

		SpringApplication.run(CollegePaymentManagementApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(StudentRepo studentRepo, PaymentRepo paymentRepo) {
		return args -> {
			studentRepo.save(Student.builder()
					.id(LocalDateTime.now().toString())
					.firstName("Ali")
					.lastName("Ben")
					.code("C001")
					.programCode("DEV")
					.programId("PID1")
					.Photo("photo1.jpg")
					.build());
			studentRepo.save(Student.builder()
					.id(LocalDateTime.now().toString())
					.firstName("Sara")
					.lastName("Khan")
					.code("C002")
					.programCode("NET")
					.programId("PID2")
					.Photo("photo2.jpg")
					.build());
			studentRepo.save(Student.builder()
					.id(LocalDateTime.now().toString())
					.firstName("John")
					.lastName("Doe")
					.code("C003")
					.programCode("DEVOPS")
					.programId("PID3")
					.Photo("photo3.jpg")
					.build());
			studentRepo.save(Student.builder()
					.id(LocalDateTime.now().toString())
					.firstName("Lina")
					.lastName("Smith")
					.code("C004")
					.programCode("CYBSEC")
					.programId("PID4")
					.Photo("photo4.jpg")
					.build());
			studentRepo.findAll().forEach(st ->{
				for (int i = 0; i < 20 ; i++) {
					Random random = new Random();
					int paymentTypeLength = PaymentType.values().length;
					paymentRepo.save(Payment.builder()
							.date(LocalDateTime.now().toLocalDate())
									.amount(random.nextDouble(100,1000))
									.paymentType(PaymentType.values()[random.nextInt(paymentTypeLength)])
							.paymentStatus(PaymentStatus.CREATED)
									.student(st)
							.build());
				}
			});

		};
	}

}
