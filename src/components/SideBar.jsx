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
      className="sidebar"
      style={{
        width: "280px",
        height: "100vh",
        backgroundColor: "#ffffff",
        borderRight: "1px solid #e2e8f0",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        boxShadow: "2px 0 8px rgba(0, 0, 0, 0.05)"
      }}
    >
      <h1 style={{ 
        fontSize: "1.8rem", 
        color: "#1e3a8a",
        marginBottom: "2rem",
        fontWeight: "600"
      }}>
        Nexus
      </h1>
      
      <nav style={{ flex: 1 }}>
        <ul style={{ 
          listStyle: "none", 
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem"
        }}>
          {user && (
            <>
              {[
                { to: "/home", label: "Home" },
                { to: "/connections", label: "Connections" },
                { to: "/messages", label: "Messages" },
                { to: "/profile", label: "Profile" }
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    style={{
                      display: "block",
                      padding: "0.75rem 1rem",
                      borderRadius: "8px",
                      color: "#1e293b",
                      fontWeight: "500",
                      transition: "all 0.2s ease-in-out",
                      ':hover': {
                        backgroundColor: "#f1f5f9",
                        color: "#2563eb"
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={handleLogout}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    borderRadius: "8px",
                    backgroundColor: "#3b82f6",
                    color: "#ffffff",
                    border: "none",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease-in-out",
                    ':hover': {
                      backgroundColor: "#2563eb"
                    },
                    ':focus': {
                      outline: "3px solid #93c5fd",
                      outlineOffset: "2px"
                    }
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          )}
          {!user && (
            <>
              {[
                { to: "/login", label: "Login" },
                { to: "/signup", label: "Sign Up" }
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    style={{
                      display: "block",
                      padding: "0.75rem 1rem",
                      borderRadius: "8px",
                      color: "#1e293b",
                      fontWeight: "500",
                      transition: "all 0.2s ease-in-out",
                      ':hover': {
                        backgroundColor: "#f1f5f9",
                        color: "#2563eb"
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
