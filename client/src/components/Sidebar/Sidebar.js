import React, { Component } from "react";
import {Avatar, IconButton} from "@material-ui/core";
import {DonutLarge, Chat, MoreVert, SearchOutlined} from "@material-ui/icons";
import './Sidebar.css';

import SidebarChat from './SidebarChat/SidebarChat';

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="sidebar__header">
            <Avatar />
            <div className="sidebar__headerRight">
                <IconButton>
                    <DonutLarge />
                </IconButton>
                <IconButton>
                    <Chat />
                </IconButton>
                <IconButton>
                    <MoreVert />
                </IconButton>
            </div>
        </div>

        <div className="sidebar__search">
          <div className="sidebar__searchContainer">
            <SearchOutlined />
            <input type="text" placeholder="Search or start a new chat" />
          </div>
        </div>

        <div className="sidebar__chats">
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
        </div>
      </div>
    );
  }
}
export default Sidebar;
