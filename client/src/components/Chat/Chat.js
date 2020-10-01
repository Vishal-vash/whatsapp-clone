import React from "react";

import "./Chat.css";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatBody from "./ChatBody/ChatBody";
import ChatFooter from "./ChatFooter/ChatFooter";

const Chat = ({ messages }) => {
  return (
    <div className="chat">
      <ChatHeader />
      <ChatBody chatBodyMessages={messages} />
      <ChatFooter />
    </div>
  );
};

export default Chat;
