// src/socket.js
import { Socket } from "phoenix";

const socket = new Socket("ws://localhost:4000/socket", {
  params: { token: localStorage.getItem("authToken") },
});

socket.connect();

export default socket;
