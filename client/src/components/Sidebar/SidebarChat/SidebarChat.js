import React, { Component } from 'react';
import { Avatar } from '@material-ui/core';

import './SidebarChat.css';
 
class SidebarChat extends Component{
   render(){
      return(
        <div className="sidebarChat">
            <Avatar />
            <div className="sidebarChat__info">
                <h2>Room Name</h2>
                <p>This is the last message.</p>
            </div>
        </div>  
      )
   }
}
export default SidebarChat;