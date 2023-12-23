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
