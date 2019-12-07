import './messages.css';
import React, {useState, useEffect} from 'react';
import {fetchMessages} from '../../services/messagesService';

export default function Messages(props) {
  let [messages, setMessages] = useState([]);

  async function loadMessages() {
    console.log("CALLED")
    try {
      let data = await fetchMessages();
      setMessages(data.data);
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(()=>{
    loadMessages()

    props.socket.on('RECEIVE_MESSAGE', function(data) {
      console.log("Received once?")
      setMessages((messages) => [...messages, data]);
    });

  }, [])

  return (
    <div className="messages-container">
      {
        messages.map((message, index)=> {
          return (
            <div className="message-item" key={index}>
              <p className="user">{message.creator_username} <span className="date">{message.sent_at}</span></p>
              <p className="text">{message.text}</p>
            </div>
          )
        })
      }
    </div>
  )
}