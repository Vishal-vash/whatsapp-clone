import React from "react";
import { Avatar, IconButton } from "@material-ui/core";
import {
  SearchOutlined,
  AttachFile,
  MoreVert
} from "@material-ui/icons";
import './ChatHeader.css';

const ChatHeader = (props) => (
  <div className="chat__header">
    <Avatar />
    <div className="chat__header__info">
      <h3>Room Name</h3>
      <p>Last seen at ...</p>
    </div>
    <div className="chat__headerRight">
      <IconButton>
        <SearchOutlined />
      </IconButton>
      <IconButton>
        <AttachFile />
      </IconButton>
      <IconButton>
        <MoreVert />
      </IconButton>
    </div>
  </div>
);

export default ChatHeader;
