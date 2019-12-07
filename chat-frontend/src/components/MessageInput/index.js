import React, {useState} from 'react';
import './message-input.css';
import {Input, Button} from 'reactstrap';

export default function MessageInput(props) {
  let [text, setText] = useState('')
  function onChange(e) {
    setText(e.target.value);
  }
  function sendMessage(e) {
    console.log("sending")
    console.log(props.chat_id);
    e.preventDefault();
    props.socket.emit('SEND_MESSAGE', {
      creator_username: "Josh",
      creator: '5de8160ebf75f3a5fe2e2044',
      text: text,
      sent_at: new Date(),
      group_chat: props.chat_id,
    });
  }
  return (
    <div className="message-input">
      <Input placeholder="Write message.." onChange={onChange} value={text}/>
      <Button color="primary" onClick={sendMessage}>Send</Button>
    </div>
  )
}