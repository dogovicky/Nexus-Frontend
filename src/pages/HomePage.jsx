import React, { useEffect, useState } from "react";
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
      await axios.post("http://localhost:8080/api/create-post", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`, // Use token from user object
        },
      });
      alert("Event created successfully");
      resetForm();
      setShowForm(false);
    } catch (error) {
      alert("Failed to create event");
    }
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  return (
    <div className="container mt-4">
      <h3>Recent Events</h3>
      <div className="mt-4">
        {events.length === 0 ? (
          <p>No posts yet</p>
        ) : (
          events.map((event, idx) => (
            <div className="card mb-3" key={idx}>
              <div className="card-body">
                <h5 className="card-title">{event.username}</h5>
                <p className="card-text">{event.content}</p>
                <p className="card-text">
                  <small className="text-muted">{event.label}</small>
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {showForm && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Event</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowForm(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <textarea
                      name="content"
                      className="form-control"
                      placeholder="Write your post here..."
                      value={newEvent.content}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="label"
                      className="form-control"
                      placeholder="Label (e.g. tech, science)"
                      value={newEvent.label}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="file"
                      className="form-control"
                      multiple
                      onChange={handleFileChange}
                    />
                  </div>
                  <button className="btn btn-primary">Post</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        className="btn btn-primary rounded-circle position-fixed"
        style={{ bottom: "20px", right: "20px", width: "60px", height: "60px" }}
        onClick={() => setShowForm(true)}
      >
        +
      </button>
    </div>
  );
};

export default HomePage;
