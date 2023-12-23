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
