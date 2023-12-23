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
