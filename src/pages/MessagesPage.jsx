// src/pages/MessagesPage.js
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchMessages, sendMessage, fetchConversations } from "../api/Message";
import { ListGroup, Button, Form, Col, Row, Card } from "react-bootstrap";
import useChatChannel from "../hooks/useChatChannel";

const MessagesPage = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { sendMessage: sendRealtimeMessage } = useChatChannel(
    user.username,
    (payload) => {
      if (payload.from === selectedUser) {
        setMessages((prev) => [
          ...prev,
          { sender: payload.from, content: payload.content },
        ]);
      }
    }
  );

  useEffect(() => {
    const loadConversations = async () => {
      const data = await fetchConversations(user.username);
      setConversations(data);
    };
    loadConversations();
  }, [user.username]);

  useEffect(() => {
    const loadMessages = async () => {
      if (selectedUser) {
        const data = await fetchMessages(user.username, selectedUser);
        setMessages(data);
      }
    };
    loadMessages();
  }, [selectedUser, user.username]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    sendRealtimeMessage(selectedUser, newMessage);
    setMessages((prev) => [
      ...prev,
      { sender: user.username, content: newMessage },
    ]);
    setNewMessage("");
  };

  return (
    <Row className="p-3">
      <Col md={4}>
        <h5>Conversations</h5>
        <ListGroup>
          {conversations.map((convUser) => (
            <ListGroup.Item
              key={convUser}
              action
              active={convUser === selectedUser}
              onClick={() => setSelectedUser(convUser)}
            >
              {convUser}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
      <Col md={8}>
        {selectedUser ? (
          <>
            <h5>Chat with {selectedUser}</h5>
            <Card
              className="mb-3"
              style={{ height: "400px", overflowY: "scroll" }}
            >
              <Card.Body>
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`mb-2 ${
                      msg.sender === user.username ? "text-end" : "text-start"
                    }`}
                  >
                    <strong>{msg.sender}:</strong> {msg.content}
                  </div>
                ))}
              </Card.Body>
            </Card>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <Row>
                <Col xs={10}>
                  <Form.Control
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                  />
                </Col>
                <Col xs={2}>
                  <Button type="submit" variant="primary">
                    Send
                  </Button>
                </Col>
              </Row>
            </Form>
          </>
        ) : (
          <p>Select a conversation to start messaging</p>
        )}
      </Col>
    </Row>
  );
};

export default MessagesPage;
