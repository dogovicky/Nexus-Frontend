import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPasswordForm = () => {
  const [passwordResetRequest, setPasswordResetRequest] = useState({
    newPassword: "",
  });
  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    setPasswordResetRequest({
      ...passwordResetRequest,
      newPassword: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const API_URL = "http://localhost:8080/auth/reset-password";
    const response = axios.post(API_URL, passwordResetRequest);
    if (response.data.status === 200) {
      alert("Password reset successfully");
      navigate("/login");
    } else {
      alert("Error resetting password");
    }
  };

  return (
    <>
      <div>
        <div>
          <h2>Enter new password.</h2>
          <p>
            If the email is registered you will receive a link to reset your
            password
          </p>
        </div>
        <div>
          <form>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={passwordResetRequest.newPassword}
                onChange={handlePasswordChange}
                required
                placeholder="Enter new password"
              />
            </div>
            <button onClick={handleSubmit} className="btn btn-primary">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordForm;
