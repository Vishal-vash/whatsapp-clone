import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "./api/axios";
import "./App.css";
import Chat from "./components/Chat/Chat";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./components/Auth/Login/Login";

function App() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios
      .get("/messages/sync")
      .then((response) => {
        setMessages(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log(process.env);
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages]);

  //console.log(messages);

  return (
    <div className="app">
      <div className="app__body">
        {/* <Login /> */}
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
