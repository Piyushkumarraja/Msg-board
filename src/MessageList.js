import React from "react";
import "./MessageList.css";

const MessageList = ({ messages, onDelete, currentPage, totalPages, onPageChange }) => {
    const messagesPerPage = 3;
    const startIndex = (currentPage - 1) * messagesPerPage;
    const endIndex = startIndex + messagesPerPage;
    const messagesToDisplay = messages.slice(startIndex, endIndex);
    const timeConvert = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();
        const timeString = `${hours % 12 === 0 ? 12 : hours % 12}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds} ${hours >= 12 ? "PM" : "AM"}`;
        return timeString;
    }
    return (
        <div className="message-list">
             {messages.map((message) => (
        <div key={message.id} className="message">
          <div className="cont">
            <p>{message.source} -</p>
            <p>{timeConvert(message.timestamp)}</p>
            <div className="btn" onClick={() => onDelete(message.id)}>Delete</div>
          </div>
          <div className="msg">{message.text}</div>
        </div>
      ))}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MessageList;