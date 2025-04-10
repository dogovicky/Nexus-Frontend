import React, { useEffect, useState } from "react";
import "../styles/HomePage.css";
import axios from "axios";
import useEvents from "../hooks/useEvents";
import useNewEvent from "../hooks/useNewEvent";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { events, loading } = useEvents();
  const { newEvent, handleInputChange, handleFileChange, resetForm } =
    useNewEvent();

  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth(); // Get user from AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", user.username); // Use username from user object
    formData.append("content", newEvent.content);
    formData.append("label", newEvent.label);
    for (let i = 0; i < newEvent.attachments.length; i++) {
      formData.append("attachments", newEvent.attachments[i]);
    }

    try {
      await axios.post(
        "https://nexus-theta-six.vercel.app/api/create-post",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // Use token from user object
          },
        }
      );
      alert("Event created successfully");
      resetForm();
      setShowForm(false);
    } catch (error) {
      alert("Failed to create event");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-primary m-0">Recent Events</h3>
      </div>

      <div className="row g-4">
        {events.length === 0 ? (
          <div className="col-12">
            <div className="text-center text-muted py-5">
              <i className="bi bi-calendar-x fs-1 mb-3 d-block"></i>
              <p className="mb-0">No posts yet. Be the first to post!</p>
            </div>
          </div>
        ) : (
          events.map((event, idx) => (
            <div className="col-12 col-md-6 col-lg-4" key={idx}>
              <div className="card h-100 shadow-sm hover-card border-0">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <div className="avatar-circle me-2">
                      {event.username[0].toUpperCase()}
                    </div>
                    <h5 className="card-title mb-0">{event.username}</h5>
                  </div>
                  <p className="card-text">{event.content}</p>
                  <span className="badge bg-primary-subtle text-primary">
                    {event.label}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showForm && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content border-0 shadow">
              <div className="modal-header border-bottom-0 pb-0">
                <h5 className="modal-title fw-bold">Create New Post</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowForm(false)}
                ></button>
              </div>
              <div className="modal-body pt-2">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <textarea
                      name="content"
                      className="form-control border-0 bg-light"
                      placeholder="What's on your mind?"
                      value={newEvent.content}
                      onChange={handleInputChange}
                      rows="4"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="label"
                      className="form-control border-0 bg-light"
                      placeholder="Add a topic (e.g. tech, science)"
                      value={newEvent.label}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="file"
                      className="form-control border-0 bg-light"
                      multiple
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="text-end">
                    <button
                      type="button"
                      className="btn btn-light me-2"
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary px-4">
                      Post
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        className="btn btn-primary rounded-circle position-fixed shadow-lg d-flex align-items-center justify-content-center"
        style={{
          bottom: "2rem",
          right: "2rem",
          width: "3.5rem",
          height: "3.5rem",
          fontSize: "1.5rem",
        }}
        onClick={() => setShowForm(true)}
      >
        <i className="bi bi-plus"></i>
      </button>
    </div>
  );
};

export default HomePage;
