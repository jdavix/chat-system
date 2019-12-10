import React, {useState} from 'react';
import './message-input.css';
import {Input, Button} from 'reactstrap';

export default function MessageInput(props) {
  let [text, setText] = useState('')
  let {currentUser} = props;

  function onChange(e) {
    setText(e.target.value);
  }
  function sendMessage(e) {
    console.log("sending")
    console.log(props.chat_id);
    e.preventDefault();
    props.socket.emit('SEND_MESSAGE', {
      message: {
        creator_username: currentUser.username,
        creator: currentUser._id,
        text: text,
        sent_at: new Date(),
        group_chat: props.chat_id,
      },
      participants: props.participants,
      from: currentUser.email,
    });
    setText('');
  }
  return (
    <div className="message-input">
      <Input placeholder="Write message.." onChange={onChange} value={text}/>
      <Button color="primary" onClick={sendMessage}>Send</Button>
    </div>
  )
}