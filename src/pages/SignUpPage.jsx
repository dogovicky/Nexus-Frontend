// src/pages/SignupPage.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import useFormValidation from "../hooks/useFormValidation";
import "../styles/SignUpPage.css";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    dateOfBirth: "",
    gender: "",
    institution: "",
    password: "",
    fieldOfInterest: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { validateForm, validateField } = useFormValidation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const fieldError = validateField(name, value);
    if (fieldError) {
      setErrors((prev) => ({ ...prev, [name]: fieldError }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(formData)) {
      return;
    }
    try {
      await axios.post("http://localhost:8080/auth/signup", formData);
      alert("Signup successful. Please login.");
      navigate("/");
    } catch (err) {
      alert("Signup failed. Try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div className="signup-card card border-0">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <h2 className="signup-header fw-bold mb-2">Create Account</h2>
                <p className="text-muted">Join the Nexus community today</p>
              </div>

              <form onSubmit={handleSubmit} className="needs-validation">
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                        id="fullName"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                      {errors.fullName && (
                        <div className="invalid-feedback" style={{ display: 'block' }}>
                          {errors.fullName}
                        </div>
                      )}
                      <label htmlFor="fullName">Full Name</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      {errors.email && (
                        <div className="invalid-feedback" style={{ display: 'block' }}>
                          {errors.email}
                        </div>
                      )}
                      <label htmlFor="email">Email</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                        id="username"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                      {errors.username && (
                        <div className="invalid-feedback" style={{ display: 'block' }}>
                          {errors.username}
                        </div>
                      )}
                      <label htmlFor="username">Username</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="date"
                        className={`form-control ${errors.dateOfBirth ? 'is-invalid' : ''}`}
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                      />
                      {errors.dateOfBirth && (
                        <div className="invalid-feedback" style={{ display: 'block' }}>
                          {errors.dateOfBirth}
                        </div>
                      )}
                      <label htmlFor="dateOfBirth">Date of Birth</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <select
                        className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                      {errors.gender && (
                        <div className="invalid-feedback" style={{ display: 'block' }}>
                          {errors.gender}
                        </div>
                      )}
                      <label htmlFor="gender">Gender</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className={`form-control ${errors.institution ? 'is-invalid' : ''}`}
                        id="institution"
                        name="institution"
                        placeholder="Institution"
                        value={formData.institution}
                        onChange={handleChange}
                        required
                      />
                      {errors.institution && (
                        <div className="invalid-feedback" style={{ display: 'block' }}>
                          {errors.institution}
                        </div>
                      )}
                      <label htmlFor="institution">Institution</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      {errors.password && (
                        <div className="invalid-feedback" style={{ display: 'block' }}>
                          {errors.password}
                        </div>
                      )}
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className={`form-control ${errors.fieldOfInterest ? 'is-invalid' : ''}`}
                        id="fieldOfInterest"
                        name="fieldOfInterest"
                        placeholder="Field of Interest"
                        value={formData.fieldOfInterest}
                        onChange={handleChange}
                        required
                      />
                      {errors.fieldOfInterest && (
                        <div className="invalid-feedback" style={{ display: 'block' }}>
                          {errors.fieldOfInterest}
                        </div>
                      )}
                      <label htmlFor="fieldOfInterest">Field of Interest</label>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <button type="submit" className="btn btn-primary btn-lg px-5">
                    Sign Up
                  </button>
                  <p className="mt-3 mb-0 text-muted">
                    Already have an account? <Link to="/login" className="text-primary">Login here</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
