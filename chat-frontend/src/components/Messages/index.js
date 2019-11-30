import './messages.css';
import React, {useState} from 'react';

export default function Messages(props) {
  let [messages, addMessage] = useState([]);

  props.socket.on('RECEIVE_MESSAGE', function(data){
    addMessage([...messages, data]);
  });

  return (
    <div className="messages-container">
      {
        messages.map((message)=> {
          return (
            <div className="message-item" key={message.id}>
              <p className="user">{message.author} <span className="date">{message.sent_at}</span></p>
              <p className="text">{message.text}</p>
            </div>
          )
        })
      }
    </div>
  )
}