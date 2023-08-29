import React, { useState } from "react";
import axios from "axios";
import "./MessageForm.css"; // Import the MessageForm CSS file

const API_BASE_URL = "https://mapi.harmoney.dev/api/v1/messages/";

const MessageForm = ({ onMessagePosted }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        API_BASE_URL,
        { text },
        {
          headers: {
            Authorization: "5v9n27zPSIaR6erZ"
          }
        }
      );
      setText("");
      onMessagePosted();
    } catch (error) {
      console.error("Error posting message:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="message-form">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your message"
      />
      <button type="submit">Post Message</button>
    </form>
  );
};

export default MessageForm;
