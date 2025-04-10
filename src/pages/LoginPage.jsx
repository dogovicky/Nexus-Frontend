// src/pages/LoginPage.js
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import useFormValidation from "../hooks/useFormValidation";
import "../styles/loginForm.css";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { errors, validateForm, validateField } = useFormValidation();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    const fieldError = validateField(name, value);
    if (fieldError) {
      setValidationErrors((prev) => ({ ...prev, [name]: fieldError }));
    } else {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(credentials)) {
      return;
    }
    setError("");
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await response.json();
      console.log(data);

      if (data && data.status === 200 && data.data) {
        const { token, userDTO } = data.data;
        const { username } = userDTO;

        console.log(token);
        console.log(username);

        login(token, username);
        navigate("/home");
      } else {
        throw new Error("Failed to login, please try again.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#f8f9fa", padding: "2rem" }}
    >
      <div className="w-100" style={{ maxWidth: "900px" }}>
        <div className="card shadow-lg border-0 rounded-3">
          <div className="card-body p-4 p-sm-5">
            <div className="text-center mb-4">
              <h2
                className="fw-bold"
                style={{
                  fontSize: "2.25rem",
                  marginBottom: "0.5rem",
                  color: "#141E61",
                }}
              >
                Welcome Back
              </h2>
              <p className="text-muted" style={{ fontSize: "1rem" }}>
                Sign in to your Nexus account
              </p>
            </div>

            {error && (
              <div
                className="alert alert-danger alert-dismissible fade show"
                role="alert"
              >
                {error}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setError("")}
                ></button>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-4">
                <input
                  type="text"
                  className={`form-control form-control-lg border-0 shadow-sm ${
                    validationErrors.username ? "is-invalid" : ""
                  }`}
                  style={{ backgroundColor: "#f8f9fa" }}
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={credentials.username}
                  onChange={handleChange}
                  required
                />
                <label className="text-muted" htmlFor="username">
                  Username
                </label>
                {validationErrors.username && (
                  <div
                    className="invalid-feedback"
                    style={{ display: "block" }}
                  >
                    {validationErrors.username}
                  </div>
                )}
              </div>

              <div className="form-floating mb-4">
                <input
                  type="password"
                  className={`form-control form-control-lg border-0 shadow-sm ${
                    validationErrors.password ? "is-invalid" : ""
                  }`}
                  style={{ backgroundColor: "#f8f9fa" }}
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                />
                <label className="text-muted" htmlFor="password">
                  Password
                </label>
                {validationErrors.password && (
                  <div
                    className="invalid-feedback"
                    style={{ display: "block" }}
                  >
                    {validationErrors.password}
                  </div>
                )}
              </div>

              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{
                    padding: "0.8rem",
                    fontSize: "1.1rem",
                    transition: "all 0.2s ease",
                  }}
                >
                  Sign In
                </button>
              </div>

              <div className="text-center mt-4">
                <p className="text-muted mb-0">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-primary fw-semibold text-decoration-none"
                    style={{ transition: "color 0.2s ease" }}
                  >
                    Create Account
                  </Link>
                </p>
                <p className="text-muted mb-0">
                  <Link
                    to="/forgot-password"
                    className="text-primary fw-semibold text-decoration-none"
                    style={{ transition: "color 0.2s ease" }}
                  >
                    Forgot Password
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
