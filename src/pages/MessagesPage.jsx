// src/pages/MessagesPage.js
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchMessages, sendMessage, fetchConversations } from "../api/Message";
import { ListGroup, Button, Form, Col, Row } from "react-bootstrap";
import useChatChannel from "../hooks/useChatChannel";
import styles from "../styles/MessagesPage.module.css";

const API_BASE = "http://localhost:8080/api/messages";

const MessagePage = ({ selectedUser, token, user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Fetch the conversation messages when the page loads or user changes
    fetchMessages(user.username, selectedUser.username, token);
  }, [user.username, selectedUser.username, token]);

  // Fetch messages between the current user and the selected user
  const fetchMessages = async (senderUsername, recipientUsername, token) => {
    try {
      const response = await axios.get(`${API_BASE}/chat`, {
        params: { sender: senderUsername, recipient: recipientUsername },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(response.data.data); // Assuming the response data is in `data`
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Send message handler
  const handleSend = async () => {
    if (!newMessage.trim()) return;

    // Send the message to both UI and backend
    await sendMessage(user.username, selectedUser.username, newMessage, token);

    // Update messages in the UI
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        senderUsername: user.username,
        recipientUsername: selectedUser.username,
        messageText: newMessage,
        timestamp: new Date().toISOString(),
      },
    ]);
    setNewMessage("");
  };

  // Send message to backend and save it in the database
  const sendMessage = async (
    senderUsername,
    recipientUsername,
    messageText,
    token
  ) => {
    try {
      const payload = {
        senderUsername,
        recipientUsername,
        messageText,
      };
      await axios.post(`${API_BASE}/send`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="message-container">
      <div className="message-header">
        <h3>Conversation with {selectedUser.username}</h3>
      </div>

      <div className="messages-list">
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.senderUsername === user.username ? "sent" : "received"
            }
          >
            <div className="message-bubble">
              <strong>{message.senderUsername}:</strong> {message.messageText}
              <br />
              {/* <span>{new Date(message.timestamp).toLocaleString()}</span> */}
            </div>
          </div>
        ))}
      </div>

      <div className="message-input">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default MessagePage;
