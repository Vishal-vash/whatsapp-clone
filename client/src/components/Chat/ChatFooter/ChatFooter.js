import React, { useState } from "react";
import { Mic, InsertEmoticon } from "@material-ui/icons";
import axios from "../../../api/axios";
import './ChatFooter.css';

const ChatFooter = (props) => {
  const [messageVal, setMessageVal] = useState("");
  const sendMessage = (e) => {
    e.preventDefault();

    axios.post("/messages/new", {
      messageText: messageVal,
      name: "Vishal",
      received: true,
    });

    setMessageVal("");
  };
  return (
    <div className="chat__footer">
      <InsertEmoticon />
      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type a message"
          value={messageVal}
          onChange={(e) => setMessageVal(e.target.value)}
        />
        <button type="submit">Send a message</button>
      </form>
      <Mic />
    </div>
  );
};

export default ChatFooter;
