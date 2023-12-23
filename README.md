# Employe-Management-System
Full Stack Project Using Backend : Spring-boot,MySQL Frontend : Reactjs 



DEVICE & OS SPECIFICATIONS

Device name	LAPTOP-063MF1VQ
Processor	11th Gen Intel(R) Core(TM) i5-1135G7 @ 2.40GHz   2.42 GHz
Installed RAM	8.00 GB (7.79 GB usable)
System type	64-bit operating system, x64-based processor
Edition	Windows 11 Home Single Language
Version     2H2



**PREREQUISITES:**

-->1.Java Development Kit (JDK)
-->2.Integrated Development Environment (IDE)
-->3.Spring Initializr
-->4.MySQL Database
-->5.React.js

*1.Java Development Kit (JDK):

>Download and install the latest version of Java SE Development Kit (JDK 17 or later) from the Oracle website or use OpenJDK.

*2.Integrated Development Environment (IDE):

>Choose an IDE such as IntelliJ IDEA, Eclipse, or Spring Tool Suite.
>Download and install the preferred IDE from their respective websites.

*3.Spring Initializr:

>Spring Initializr is a web-based tool for generating a Spring Boot project template.
>Access Spring Initializr via start.spring.io.

*4.MySQL Database:

>Install MySQL Server to set up a local database.
>Download MySQL from the official website.

			
-->Step 1: Create a Spring Boot Project

>Open your IDE (IntelliJ IDEA, Eclipse, etc.).
>Create a new Spring Boot project with Maven as the build tool.
>Add necessary dependencies like 
             * Spring Web, 
             *Spring Data JPA,
             *MySQL Driver, and 
             *Lombok in the pom.xml file.

-->Step 2: Configure Database Connection

>Update application.yml or appilication.properties with your MySQL database configuration.

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/employeems
    username: your_username
    password: your_password
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    show-sql: true
    hibernate:
      ddl-auto: update

-->Step 3: Create Employee Entity Class

>Create an Employee entity class with necessary attributes and annotations.
***
package com.ems.employeemanagementsys.model;
import org.hibernate.annotations.NaturalId;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
// lombok
@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    @NaturalId(mutable = true)
    private String email;
    private String department;
}

-->Step 4: Create Employee Repository

>Create an EmployeeRepository interface extending JpaRepository<Employee, Long> to handle CRUD operations.

package com.ems.employeemanagementsys.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.ems.employeemanagementsys.model.Employee;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
        Optional<Employee> findByEmail(String email);   // Change return type to Optional<Employee>
    // Add other custom query methods if needed for Employee entity
}


-->Step 5: Implement Employee Service

>1.IEmployeeService Interface:

    -IEmployeeService is an interface that defines the contract for handling employee-related operations. It typically includes method signatures for CRUD functionalities.

      package com.example.employeemanagement.service;

import com.example.employeemanagement.model.Employee;
import java.util.List;

public interface IEmployeeService {
    List<Employee> getEmployees();
    Employee addEmployee(Employee employee);
    Employee updateEmployee(Employee employee, Long id);
    Employee getEmployeeById(Long id);
    void deleteEmployee(Long id);
}
 >2.EmployeeService Implementation:

      -EmployeeService is a class implementing the IEmployeeService interface. It contains the actual implementation of CRUD operations for employees.

         package com.example.employeemanagement.service;

import com.example.employeemanagement.model.Employee;
import com.example.employeemanagement.repository.EmployeeRepository;
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
        // Implement logic to add an employee to the database
        return employeeRepository.save(employee);
    }

    @Override
    public Employee updateEmployee(Employee employee, Long id) {
        // Implement logic to update an existing employee by ID
        // Find the employee by ID, update fields, and save it back
        Employee existingEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));

        existingEmployee.setFirstName(employee.getFirstName());
        existingEmployee.setLastName(employee.getLastName());
        existingEmployee.setEmail(employee.getEmail());
        existingEmployee.setDepartment(employee.getDepartment());

        return employeeRepository.save(existingEmployee);
    }

    @Override
    public Employee getEmployeeById(Long id) {
        // Implement logic to retrieve an employee by ID
        return employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
    }

    @Override
    public void deleteEmployee(Long id) {
        // Implement logic to delete an employee by ID
        if (!employeeRepository.existsById(id)) {
            throw new RuntimeException("Employee not found with id: " + id);
        }
        employeeRepository.deleteById(id);
    }
}

>3.Explanation:

-EmployeeService uses EmployeeRepository to perform database operations (CRUD) related to employees.

-@Service annotation marks it as a service component in Spring for automatic component scanning and dependency injection.

-Each method (getEmployees, addEmployee, updateEmployee, getEmployeeById, deleteEmployee) contains logic for handling respective CRUD operations on employees using the repository.

-Error handling for cases such as employee not found (RuntimeException) can be further improved using custom exceptions and proper exception handling.

-By implementing the EmployeeService based on the IEmployeeService interface, you establish a clean separation of concerns, allowing for easy unit testing and maintainability in your Spring Boot application. Adjust the implementation as needed based on your specific requirements and business logic.


-->Step 6: Create Employee Controller

  -Design an EmployeeController to handle HTTP requests.
   
package com.ems.employeemanagementsys.controller;
import com.ems.employeemanagementsys.model.Employee;
import com.ems.employeemanagementsys.service.IEmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/employees")
@RequiredArgsConstructor
public class EmployeeController {
    private final IEmployeeService employeeService;

    @GetMapping
    public ResponseEntity<List<Employee>> getEmployees() {
        return new ResponseEntity<>(employeeService.getEmployees(), HttpStatus.FOUND);
    }

    @PostMapping
    public Employee addEmployee(@RequestBody Employee employee) {
        return employeeService.addEmployee(employee);
    }

    @PutMapping("/update/{id}")
    public Employee updateEmployee(@RequestBody Employee employee, @PathVariable Long id) {
        return employeeService.updateEmployee(employee, id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
    }

    @GetMapping("/employee/{id}")
    public Employee getEmployeeById(@PathVariable Long id) {
        return employeeService.getEmployeeById(id);
    }
}


-->Step 7: Exception Handling

  >EmployeeNotFoundException Handling

  @ResponseStatus(HttpStatus.NOT_FOUND)
  @ExceptionHandler(EmployeeNotFoundException.class)
   public Map<String, String> userNotFound(EmployeeNotFoundException ex){
    Map<String, String> error = new HashMap<>();
    error.put("error", ex.getMessage());
    return error;
   }

  >EmployeeAlreadyExistsException Handling

   @ResponseStatus(HttpStatus.BAD_REQUEST)
@ExceptionHandler(EmployeeAlreadyExistsException.class)
public Map<String, String> userAlreadyExists(EmployeeAlreadyExistsException ex){
    Map<String, String> error = new HashMap<>();
    error.put("error", ex.getMessage());
    return error;
}



-->Step 8:Testing CRUD Operations with Postman
      
 >Create Operation (POST):

*Use Postman to send a POST request to create a new employee.
*Set the request URL to http://localhost:PORT_NUMBER/employees 
*In the request body, include the details of the new employee (firstName, lastName, email, department) in JSON format.

>Read Operation (GET):

*Perform a GET request to retrieve information about employees.
*Send a GET request to http://localhost:PORT_NUMBER/employees to get a list of all employees.
*To retrieve a specific employee, use http://localhost:PORT_NUMBER/employees/employee/{id} where {id} is the ID of the employee you want to fetch.

>Update Operation (PUT):

*Use Postman to send a PUT request to update an existing employee's details.
*Send a PUT request to http://localhost:PORT_NUMBER/employees/update/{id} with the updated details of the employee in the request body (as JSON).
*Replace {id} in the URL with the ID of the employee you want to update.

>Delete Operation (DELETE):

*To delete an employee record, send a DELETE request to http://localhost:PORT_NUMBER/employees/delete/{id} where {id} is the ID of the employee to be deleted.


->>Frontend Overview:

>Technologies Used:
*React.js: A JavaScript library for building user interfaces.
*React Router: Used for handling routing within the React application.
*Axios: A promise-based HTTP client for making requests to the backend API.

1.Setting up React App:
>Use Create React App or any preferred method to set up your React application.
>If using Create React App, you can create a new app by running:
*npx create-react-app my-react-app
*cd my-react-app

2.Install Axios or Use Fetch API:
>Axios is a popular JavaScript library that simplifies making HTTP requests.
>To install Axios, 
*run:npm install axios

3.Develop Frontend Components:

***NavBar component:***
-->The NavBar component creates a navigation bar for easy access to different sections of the application.

import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to={"/"}>
                    Employee Management
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link
                                className="nav-link active"
                                aria-current="page"
                                to={"/view-employees"}
                            >
                                View All Employees
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link active"
                                to={"/add-employees"}
                            >
                                Add New Employee
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;


***AddEmployee Component:***
-->The AddEmployee component allows users to add new employees by making POST requests to the backend API.

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddEmployee = () => {
    let navigate = useNavigate();
    const [employee, setEmployee] = useState({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
    });
    const { firstName, lastName, email, department } = employee;

    const handleInputChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value,
        });
    };

    const saveEmployee = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:9192/employees", employee);
        navigate("/view-employees");
    };

    return (
      
        <div className="col-sm-8 py-2 px-5 offset-2 shadow" style={{ marginTop: "100px" }}>
            <h2 className="mt-5"> Add Employee</h2>
            <form onSubmit={(e) => saveEmployee(e)}>
                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="firstName">
                        First Name
                    </label>
                    <input
                        className="form-control col-sm-6"
                        type="text"
                        name="firstName"
                        id="firstName"
                        required
                        value={firstName}
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="lastName">
                        Last Name
                    </label>
                    <input
                        className="form-control col-sm-6"
                        type="text"
                        name="lastName"
                        id="lastName"
                        required
                        value={lastName}
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="email">
                        Your Email
                    </label>
                    <input
                        className="form-control col-sm-6"
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="department">
                        Department
                    </label>
                    <input
                        className="form-control col-sm-6"
                        type="text"
                        name="department"
                        id="department"
                        required
                        value={department}
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>

                <div className="row mb-5">
                    <div className="col-sm-2">
                        <button
                            type="submit"
                            className="btn btn-outline-success btn-lg"
                        >
                            Save
                        </button>
                    </div>

                    <div className="col-sm-2">
                        <Link
                            to={"/view-employees"}
                            type="submit"
                            className="btn btn-outline-warning btn-lg">
                            Cancel
                        </Link>
                    </div>
                </div>
            </form>
        </div>
 
    );
};

export default AddEmployee;

***EmployeeView component:***
-->The EmployeesView component displays a list of employees fetched from the backend API.

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Search from "../common/Search";

const EmployeesView = () => {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        const result = await axios.get(
            "http://localhost:9192/employees",
            {
                validateStatus: () => {
                    return true;
                },
            }
        );
        if (result.status === 302) {
            setEmployees(result.data);
        }
    };

    const handleDelete = async (id) => {
        await axios.delete(
            `http://localhost:9192/employees/delete/${id}`
        );
        loadEmployees();
    };

    return (
        <section style={{ marginTop: "100px" }} >
            <Search
                search={search}
                setSearch={setSearch}
            />
            <table className="table table-bordered table-hover shadow">
                <thead>
                    <tr className="text-center">
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th colSpan="3">Actions</th>
                    </tr>
                </thead>

                <tbody className="text-center">
                    {employees
                        .filter((emp) =>
                            emp.firstName
                                .toLowerCase()
                                .includes(search)
                        )
                        .map((employee, index) => (
                            <tr key={employee.id}>
                                <th scope="row" key={index}>
                                    {index + 1}
                                </th>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>{employee.department}</td>
                                <td className="mx-2">
                                    <Link
                                        to={`/employee-profile/${employee.id}`}
                                        className="btn btn-info">
                                        <FaEye style={{ color: "green", fontSize: "24px" }} />
                                    </Link>
                                </td>
                                <td className="mx-2">
                                    <Link
                                        to={`/edit-employee/${employee.id}`}
                                        className="btn btn-dark">
                                         <FaEdit style={{ color: "orange", fontSize: "24px" }} />
                                    </Link>
                                </td>
                                <td className="mx-2">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            handleDelete(employee.id)
                                        }>
                                       <FaTrashAlt style={{ color: "white", fontSize: "24px" }} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </section>
    );
};

export default EmployeesView;

***EditEmployee component:***
 -->The EditEmployee component enables editing employee details and updates the information via PUT requests to the backend API.

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditEmployee = () => {
    let navigate = useNavigate();
    const { id } = useParams();

    const [employee, setEmployee] = useState({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
        // Add more fields as needed for the employee
        // For example: position, salary, etc.
    });

    const {
        firstName,
        lastName,
        email,
        department,
        // Destructure additional fields here
        // For example: position, salary, etc.
    } = employee;

    useEffect(() => {
        loadEmployee();
    }, []);

    const loadEmployee = async () => {
        try {
            const result = await axios.get(
                `http://localhost:9192/employees/employee/${id}`
            );
            setEmployee(result.data);
        } catch (error) {
            console.error("Error loading employee:", error);
        }
    };

    const handleInputChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value,
        });
    };

    const updateEmployee = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://localhost:9192/employees/update/${id}`,
                employee
            );
            navigate("/view-employees");
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    };

    return (
        <div className="col-sm-8 py-2 px-5 offset-2 shadow" style={{ marginTop: "100px" }}>
            <h2 className="mt-5">Edit Employee</h2>
            <form onSubmit={(e) => updateEmployee(e)}>
                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="firstName">
                        First Name
                    </label>
                    <input
                        className="form-control col-sm-6"
                        type="text"
                        name="firstName"
                        id="firstName"
                        required
                        value={firstName}
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>
                 

                <div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="lastName">
						Last Name
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="lastName"
						id="lastName"
						required
						value={lastName}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="email">
						Your Email
					</label>
					<input
						className="form-control col-sm-6"
						type="email"
						name="email"
						id="email"
						required
						value={email}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="department">
						Department
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="department"
						id="department"
						required
						value={department}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>
                {/* Add more input fields for other details of the employee */}
                {/* For example: Last Name, Email, Department, etc. */}

                <div className="row mb-5">
                    <div className="col-sm-2">
                        <button
                            type="submit"
                            className="btn btn-outline-success btn-lg"
                        >
                            Save
                        </button>
                    </div>
                    <div className="col-sm-2">
                        <Link
                            to={"/view-employees"}
                            type="submit"
                            className="btn btn-outline-warning btn-lg"
                        >
                            Cancel
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditEmployee;


***EmployeeProfile Component:***
-->The EmployeeProfile component displays detailed information about a specific employee.

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EmployeeProfile = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
    });

    useEffect(() => {
        loadEmployee();
    }, []);

    const loadEmployee = async () => {
        const result = await axios.get(
            `http://localhost:9192/employees/employee/${id}`
        );
        setEmployee(result.data);
    };

    return (
        <section className="shadow" style={{ backgroundColor: "whitesmoke", marginTop: "100px"}} >
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="card mb-4">
                            <div className="card-body text-center">
                                {/* Adjusted the image and name to show employee details */}
                                <img
                                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                    alt="avatar"
                                    className="rounded-circle img-fluid"
                                    style={{ width: 150 }}
                                />
                                <h5 className="my-3">
                                    {`${employee.firstName} ${employee.lastName}`}
                                </h5>
                                {/* Buttons for call and message can be added */}
                                <div className="d-flex justify-content-center mb-2">
									<button
										type="button"
										className="btn btn-outline-primary">
										Call
									</button>
									<button
										type="button"
										className="btn btn-outline-warning ms-1">
										Message
									</button>
								</div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-9">
                        <div className="card mb-4">
                            <div className="card-body">
                                {/* Displaying employee information */}
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h5 className="mb-0">
                                            First Name
                                        </h5>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">
                                            {employee.firstName}
                                        </p>
                                    </div>
                                </div>
                                {/* Repeat the structure for Last Name, Email, Department */}
                                {/* ... */}
                                <hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Last Name
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{employee.lastName}
										</p>
									</div>
								</div>
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Email
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{employee.email}
										</p>
									</div>
								</div>
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Department
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{employee.department}
										</p>
									</div>
								</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EmployeeProfile;



***SearchEmployee Component***
-->The Search component provides a search box for filtering employees based on specific criteria.

import React from "react";
const Search = ({ search, setSearch }) => {
    return (
        <div className="col-sm-6 mb-4">
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    className="form-control"
                    type="search"
                    role="searchbox"
                    placeholder="Search employees..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                ></input>
            </form>
        </div>
    );
};

export default Search;

**Integration with Backend**
-->The frontend interacts with the Spring Boot backend through Axios HTTP requests.

>Making HTTP Requests
*GET Requests: Used to fetch data from the backend.
*POST Requests: Used to add new employees.
*PUT Requests: Used to update employee details.
*DELETE Requests: Used to delete employee records.

**App.js **

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import Home from "./Home";
import EmployeesView from "./component/employee/EmployeeView.js"; // Adjusted component name
import NavBar from "./component/common/NavBar";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import AddEmployee from "./component/employee/AddEmployee"; // Adjusted component name
import EditEmployee from "./component/employee/EditEmployee"; // Adjusted component name
import EmployeeProfile from "./component/employee/EmployeeProfile"; // Adjusted component name


function App() {
	return (
		<main className="container mt-5">
			<Router>
			
				<NavBar />
				<Routes>
					<Route
						exact
						path="/"
						element={<Home />}
					></Route>
					<Route
						exact
						path="/view-employees" // Adjusted route path
						element={<EmployeesView />}
					></Route>
					<Route
						exact
						path="/add-employees" // Adjusted route path
						element={<AddEmployee />}
					></Route>
					<Route
						exact
						path="/edit-employee/:id" // Adjusted route path
						element={<EditEmployee />}
					></Route>
					<Route
						exact
						path="/employee-profile/:id" // Adjusted route path
						element={<EmployeeProfile />}
					></Route>
				</Routes>
			</Router>
		</main>
	);
}

export default App;


Conclusion:
The Employee Management application serves as an effective tool for managing employee data, offering a seamless experience for users to interact with the system.
The combination of Spring Boot and MySQL on the backend, along with React.js on the frontend, 
creates a robust and scalable architecture, allowing for further enhancements and features to meet evolving business needs.

The application demonstrates the successful integration of various technologies to deliver a reliable and efficient system for employee data management,
 catering to the modern requirements of businesses in maintaining personnel records.
