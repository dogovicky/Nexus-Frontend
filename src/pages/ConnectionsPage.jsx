// src/pages/ConnectionsPage.js
import React, { useEffect, useState } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import { useAuth } from "../context/AuthContext"; // Import AuthContext
import "../styles/connections.css";

const ConnectionsPage = () => {
  const { user } = useAuth();
  const [connections, setConnections] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const resConnections = await fetch(
          `http://localhost:8080/api/connections`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const dataConnections = await resConnections.json();
        setConnections(dataConnections.data || []);

        const resSuggestions = await fetch(
          `http://localhost:8080/api/users/suggestions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const dataSuggestions = await resSuggestions.json();
        setSuggestedUsers(dataSuggestions.data || []);
      } catch (error) {
        console.error("Error fetching connections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, []);

  const handleConnect = async (targetUsername) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `https://nexus-theta-six.vercel.app/api/connections/${targetUsername}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setSuggestedUsers((prev) =>
          prev.filter((user) => user.username !== targetUsername)
        );
        alert("Connection request sent!");
      } else {
        alert("Failed to connect");
      }
    } catch (err) {
      console.error("Connect error:", err);
    }
  };

  if (loading) return (
    <div className="loading-spinner">
      <Spinner animation="border" variant="primary" />
    </div>
  );

  return (
    <div className="connections-container">
      <h3 className="connections-heading">Your Connections</h3>
      <div className="mb-4">
        {connections.length > 0 ? (
          connections.map((user) => (
            <Card className="connection-card" key={user.username}>
              <Card.Body>
                <Card.Title className="user-full-name">{user.fullName}</Card.Title>
                <Card.Text className="user-username">@{user.username}</Card.Text>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>You have no connections yet.</p>
        )}
      </div>

      <div className="section-divider" />
      
      <h3 className="connections-heading">Suggested Users</h3>
      {suggestedUsers.length > 0 ? (
        suggestedUsers.map((user) => (
          <Card className="connection-card" key={user.username}>
            <Card.Body>
              <Card.Title className="user-full-name">{user.fullName}</Card.Title>
              <Card.Text className="user-username">@{user.username}</Card.Text>
              <Button
                className="connect-btn"
                onClick={() => handleConnect(user.username)}
              >
                Connect
              </Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No suggestions at the moment.</p>
      )}
    </div>
  );
};

export default ConnectionsPage;
