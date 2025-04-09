// src/pages/ConnectionsPage.js
import React, { useEffect, useState } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import { useAuth } from "../context/AuthContext"; // Import AuthContext

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
          `https://nexus-theta-six.vercel.app/api/connections`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const dataConnections = await resConnections.json();
        setConnections(dataConnections.data || []);

        const resSuggestions = await fetch(
          `https://nexus-theta-six.vercel.app/api/users/suggestions`,
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

  if (loading) return <Spinner animation="border" variant="primary" />;

  return (
    <div className="p-3">
      <h3>Your Connections</h3>
      <div className="mb-4">
        {connections.length > 0 ? (
          connections.map((user) => (
            <Card className="mb-2" key={user.username}>
              <Card.Body>
                <Card.Title>{user.fullName}</Card.Title>
                <Card.Text>@{user.username}</Card.Text>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>You have no connections yet.</p>
        )}
      </div>

      <h3>Suggested Users</h3>
      {suggestedUsers.length > 0 ? (
        suggestedUsers.map((user) => (
          <Card className="mb-2" key={user.username}>
            <Card.Body>
              <Card.Title>{user.fullName}</Card.Title>
              <Card.Text>@{user.username}</Card.Text>
              <Button
                variant="primary"
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
