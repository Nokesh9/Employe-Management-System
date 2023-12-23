package com.ems.employeemanagementsys.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.ems.employeemanagementsys.model.Employee;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    // Optional<com.ems.employeemanagementsys.model.Employee> findByEmail(String email); // Change return type to Optional<Employee>
    // Add other custom query methods if needed for Employee entity
    Optional<Employee> findByEmail(String email);
}