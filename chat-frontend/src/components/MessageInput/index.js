import React, {useState} from 'react';
import './message-input.css';
import {Input, Button} from 'reactstrap';

export default function MessageInput(props) {
  let [text, setText] = useState('')
  function onChange(e) {
    setText(e.target.value);
  }
  function sendMessage(e){
    e.preventDefault();
    props.socket.emit('SEND_MESSAGE', {
      id: Math.random(),
      author: "Josh",
      text: text,
      sent_at: '3:00 PM'
    });
  }
  return (
    <div className="message-input">
      <Input placeholder="Write message.." onChange={onChange} value={text}/>
      <Button color="primary" onClick={sendMessage}>Send</Button>
    </div>
  )
}