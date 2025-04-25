package com.abdellah.collegepaymentmanagement.repositories;

import com.abdellah.collegepaymentmanagement.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepo extends JpaRepository<Student, String> {
    
    Student findByCode(String code);
    List<Student> findByProgramId(String programId);
    
}
