// src/hooks/useNewEvent.js
import { useState } from "react";

const useNewEvent = () => {
  const [newEvent, setNewEvent] = useState({
    content: "",
    label: "",
    communityId: "",
    attachments: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewEvent({ ...newEvent, attachments: e.target.files });
  };

  const resetForm = () => {
    setNewEvent({
      content: "",
      label: "",
      communityId: "",
      attachments: [],
    });
  };

  return {
    newEvent,
    handleInputChange,
    handleFileChange,
    resetForm,
  };
};

export default useNewEvent;
