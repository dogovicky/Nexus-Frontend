// src/components/Sidebar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-light"
      style={{ width: "250px", height: "100vh" }}
    >
      <h4 className="mb-4">Collab</h4>
      <ul className="nav nav-pills flex-column mb-auto">
        {user && (
          <>
            <li className="nav-item">
              <Link to="/home" className="nav-link link-dark">
                Home
              </Link>
            </li>
            <li>
              <Link to="/connections" className="nav-link link-dark">
                Connections
              </Link>
            </li>
            <li>
              <Link to="/messages" className="nav-link link-dark">
                Messages
              </Link>
            </li>
            <li>
              <Link to="/profile" className="nav-link link-dark">
                Profile
              </Link>
            </li>
            <li>
              <button
                className="btn btn-link nav-link link-dark"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </>
        )}
        {!user && (
          <>
            <li>
              <Link to="/login" className="nav-link link-dark">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="nav-link link-dark">
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
