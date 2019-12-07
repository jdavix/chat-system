import './messages.css';
import React, {useState, useEffect, useRef} from 'react';
import {fetchMessages} from '../../services/messagesService';

export default function Messages(props) {
  let [messages, setMessages] = useState([]);
  let container = useRef()

  async function loadMessages() {
    try {
      if (!props.chat_id) return null ;

      console.log("CHAT ID: ", props.chat_id);
      let data = await fetchMessages({chat_id: props.chat_id});
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
      console.log("New Height: ", container.current.scrollHeight);
      container.current.scrollTop = container.current.scrollHeight;
    });

  }, [props.socket])

  useEffect(()=>{
    container.current.scrollTop = container.current.scrollHeight;
  }, [messages])

  return (
    <div className="messages-container" ref={container}>
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