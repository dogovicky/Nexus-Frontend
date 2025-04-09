// src/api/messages.js
import axios from "axios";

const API_BASE = "http://localhost:8080/api/messages";

export const fetchConversations = async (username) => {
  const response = await axios.get(`${API_BASE}/conversations/${username}`);
  return response.data.data;
};

export const fetchMessages = async (sender, recipient) => {
  const response = await axios.get(`${API_BASE}/chat`, {
    params: { sender, recipient },
  });
  return response.data.data;
};

export const sendMessage = async (sender, recipient, content) => {
  const payload = { sender, recipient, content };
  const response = await axios.post(`${API_BASE}/send`, payload);
  return response.data.data;
};
