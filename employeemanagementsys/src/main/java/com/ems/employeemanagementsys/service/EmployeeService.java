package com.ems.employeemanagementsys.service;

import com.ems.employeemanagementsys.exception.EmployeeAlreadyExistsException;
import com.ems.employeemanagementsys.exception.EmployeeNotFoundException;
import com.ems.employeemanagementsys.model.Employee;
import com.ems.employeemanagementsys.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService implements IEmployeeService {
    private final EmployeeRepository employeeRepository;

    @Override
    public List<Employee> getEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee addEmployee(Employee employee) {
        if (employeeAlreadyExists(employee.getEmail())) {
            throw new EmployeeAlreadyExistsException(employee.getEmail() + " already exists!");
        }
        return employeeRepository.save(employee);
    }

    @Override
    public Employee updateEmployee(Employee employee, Long id) {
        return employeeRepository.findById(id).map(emp -> {
            emp.setFirstName(employee.getFirstName());
            emp.setLastName(employee.getLastName());
            emp.setEmail(employee.getEmail());
            emp.setDepartment(employee.getDepartment());
            // Set other attributes accordingly
            return employeeRepository.save(emp);
        }).orElseThrow(() -> new EmployeeNotFoundException("Sorry, this employee could not be found"));
    }

    @Override
    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException("Sorry, no employee found with the Id: " + id));
    }

    @Override
    public void deleteEmployee(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new EmployeeNotFoundException("Sorry, employee not found");
        }
        employeeRepository.deleteById(id);
    }

    private boolean employeeAlreadyExists(String email) {
        return employeeRepository.findByEmail(email).isPresent();
    }
}
