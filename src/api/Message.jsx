// // src/api/messages.js
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";

// const API_BASE = "http://localhost:8080/api/messages";
// const { user } = useAuth();

// export const fetchConversations = async (username = user.username) => {
//   const response = await axios.get(`${API_BASE}/conversations/${username}`, {
//     headers: {
//       Authorization: `Bearer ${user.token}`,
//     },
//   });
//   return response.data.data;
// };

// export const fetchMessages = async (sender, recipient) => {
//   const response = await axios.get(`${API_BASE}/chat`, {
//     params: { sender, recipient },
//   });
//   return response.data.data;
// };

// export const sendMessage = async (sender, recipient, content) => {
//   const payload = { sender, recipient, content };
//   const response = await axios.post(`${API_BASE}/send`, payload);
//   return response.data.data;
// };

import axios from "axios";

const API_BASE = "https://nexus-theta-six.vercel.app/api/messages";

export const fetchConversations = async (username, token) => {
  const response = await axios.get(`${API_BASE}/conversations/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchMessages = async (sender, recipient, token) => {
  const response = await axios.get(`${API_BASE}/chat`, {
    params: { sender, recipient },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data);
  return response.data;
};

export const sendMessage = async (
  senderUsername,
  recipientUsername,
  messageText,
  token
) => {
  const payload = { senderUsername, recipientUsername, messageText };
  const response = await axios.post(`${API_BASE}/send`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
