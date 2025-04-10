import axios from "axios";
import React from "react";

const ForgotPassword = () => {
  const [passwordResetRequest, setPasswordResetRequest] = React.useState({
    email: "",
  });
  const handleEmailChange = (event) => {
    setPasswordResetRequest({
      ...passwordResetRequest,
      email: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const API_URL = "http://localhost:8080/auth/forgot-password";
    const response = axios.post(API_URL, passwordResetRequest);
    if (response.data.status === 200) {
      alert("Email sent successfully");
    } else {
      alert("Error sending email");
    }
  };

  return (
    <>
      <div>
        <div>
          <h2>Enter email.</h2>
          <p>
            If the email is registered you will receive a link to reset your
            password
          </p>
        </div>
        <div>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={passwordResetRequest.email}
                onChange={handleEmailChange}
                required
                placeholder="Enter email"
              />
            </div>
            <button onClick={handleSubmit} className="btn btn-primary">
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
