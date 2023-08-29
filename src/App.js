import React, { useState, useEffect } from "react";
import axios from "axios";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import "./App.css"; // Import the main CSS file

const API_BASE_URL = "https://mapi.harmoney.dev/api/v1/messages/";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 3; // Number of messages to display per page

  useEffect(() => {
    fetchMessages();
  }, [currentPage, sortOrder]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(API_BASE_URL, {
        headers: {
          Authorization: "5v9n27zPSIaR6erZ"
        }
      });
      const sortedMessages = sortOrder === "asc" ? response.data : response.data.reverse();
      setMessages(sortedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * messagesPerPage;
  const endIndex = startIndex + messagesPerPage;
  const messagesToDisplay = messages.slice(startIndex, endIndex);

  const handleDelete = async (messageId) => {
    try {
      await axios.delete(`${API_BASE_URL}${messageId}`, {
        headers: {
          Authorization: "5v9n27zPSIaR6erZ"
        }
      });
      fetchMessages();
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      for (const message of messages) {
        await axios.delete(`${API_BASE_URL}${message.id}`, {
          headers: {
            Authorization: "5v9n27zPSIaR6erZ"
          }
        });
      }
      fetchMessages();
    } catch (error) {
      console.error("Error deleting messages:", error);
    }
  };


  return (
    <div className="App">
      <h1>Message Board</h1>
      <div className="form-cont">
        <MessageForm onMessagePosted={fetchMessages} />
        <button className="sort-button" onClick={toggleSortOrder}>
          Sort {sortOrder === "asc" ? "Newest" : "Oldest"}
        </button>
        <button className="sort-button" onClick={handleDeleteAll}>
          Delete All
        </button>
      </div>
     
      <MessageList
        messages={messagesToDisplay}
        onDelete={handleDelete}
        currentPage={currentPage}
        totalPages={Math.ceil(messages.length / messagesPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
