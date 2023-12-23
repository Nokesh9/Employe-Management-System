package com.ems.employeemanagementsys.service;

import java.util.List;

import com.ems.employeemanagementsys.model.Employee;

public interface IEmployeeService { 
    Employee addEmployee(Employee employee); 
    List<Employee> getEmployees(); 
    Employee updateEmployee(Employee employee, Long id); 
    Employee getEmployeeById(Long id); 
    void deleteEmployee(Long id); 
}