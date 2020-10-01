import React from "react";
import './ChatBody.css';

const ChatBody = ({ chatBodyMessages }) => (
  <div className="chat__body">
    {chatBodyMessages.map((message) => (
      <p
        className={`chat__message ${message.received && "chat__receiver"}`}
        key={message._id}
      >
        <span className="chat__message__name">{message.name}</span>
        {message.messageText}
        <span className="chat__message__timestamp">{message.timestamp}</span>
      </p>
    ))}
  </div>
);

export default ChatBody;
