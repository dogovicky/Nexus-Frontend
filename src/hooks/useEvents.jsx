// src/hooks/useEvents.js
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Import AuthContext

const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Get user from AuthContext
  const token = localStorage.getItem("authToken");
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchEvents = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      console.log("Fetching events for user:", user.username);
      try {
        const res = await axios.get(
          "https://nexus-theta-six.vercel.app/?username=" + user.username,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setEvents(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading };
};

export default useEvents;
