// src/pages/MessagesPage.js
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchMessages, sendMessage, fetchConversations } from "../api/Message";
import { ListGroup, Button, Form, Col, Row } from "react-bootstrap";
import useChatChannel from "../hooks/useChatChannel";
import styles from "../styles/MessagesPage.module.css";

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
    <Row className="h-100">
      <Col md={4} className={styles.conversationsContainer}>
        <h5 className="p-3">Conversations</h5>
        <ListGroup className={styles.userList}>
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
          <div className={styles.chatContainer}>
            <h5 className="p-3">Chat with {selectedUser}</h5>
            <div className={styles.messagesContainer}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`${styles.message} ${
                    msg.sender === user.username
                      ? styles.sentMessage
                      : styles.receivedMessage
                  }`}
                >
                  {msg.content}
                </div>
              ))}
            </div>
            <Form
              className={styles.messageForm}
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
                  <Button type="submit" variant="primary" className="w-100">
                    Send
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        ) : (
          <div className="d-flex align-items-center justify-content-center h-100">
            <p className="text-muted">Select a conversation to start messaging</p>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default MessagesPage;
