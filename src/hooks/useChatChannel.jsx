// src/hooks/useChatChannel.js
import { useEffect, useRef } from "react";
import socket from "../socket";

const useChatChannel = (username, onMessageReceived) => {
  const channelRef = useRef(null);

  useEffect(() => {
    if (!username) return;

    const channel = socket.channel(`chat:${username}`, {});
    channelRef.current = channel;

    channel
      .join()
      .receive("ok", (resp) =>
        console.log("Joined chat channel successfully", resp)
      )
      .receive("error", (err) => console.error("Unable to join", err));

    channel.on("new_message", onMessageReceived);

    return () => {
      channel.leave();
    };
  }, [username, onMessageReceived]);

  const sendMessage = (to, content) => {
    channelRef.current.push("send_message", { to, content });
  };

  return { sendMessage };
};

export default useChatChannel;
