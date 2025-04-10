import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Import your AuthContext
import { useNavigate } from "react-router-dom";

const ValidateAccount = () => {
  const username = localStorage.getItem("username");
  const [validationRequest, setValidationRequest] = useState({
    username: username,
    code: "",
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleValidationCodeChange = (event) => {
    setValidationRequest({
      ...validationRequest,
      code: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const API_URL = "http://localhost:8080/auth/verify-account";
    const response = axios.post(API_URL, validationRequest);
    if (response.data.status === 200) {
      user.setUser(response.data.data.token, response.data.data.username);
      navigate("/home");
    }
  };

  return (
    <>
      <div>
        <div>
          <h2>Enter validation code sent to your email address</h2>
        </div>
        <div>
          <form>
            <div className="mb-3">
              <label htmlFor="validationCode" className="form-label">
                Validation Code
              </label>
              <input
                type="text"
                className="form-control"
                id="validationCode"
                name="code"
                value={validationRequest.code}
                onChange={handleValidationCodeChange}
                required
                placeholder="Enter validation code"
              />
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="btn btn-primary"
            >
              Validate
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ValidateAccount;
