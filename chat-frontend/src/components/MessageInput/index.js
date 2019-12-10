import React, {useState, useEffect} from 'react';
import './message-input.css';
import {Input, Button} from 'reactstrap';

let timer = null;
export default function MessageInput(props) {
  const [text, setText] = useState('')
  const [typing, setTyping] = useState(null)
  let {currentUser, chat_id} = props;

  useEffect(()=>{
    props.socket.on('TYPING', function(data) {
      setTyping(data.username);
    });
  }, [props.socket, currentUser, chat_id])

  function onChange(e) {
    clearTimeout(timer);
    setText(e.target.value);

    props.socket.emit('TYPING', {
      username: currentUser.username,
      chat_id: chat_id,
    });

    timer = setTimeout(()=>{
      props.socket.emit('TYPING', {chat_id: chat_id})
    }, 1000);
  }
  function sendMessage(e) {
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
      { typing ? <div className="typing">{typing === currentUser.username ? 'You are ' : `${typing} is`} typing...</div> : null}
      <div className="input">
        <Input placeholder="Write message.." onChange={onChange} value={text}/>
        <Button color="primary" onClick={sendMessage}>Send</Button>
      </div>
    </div>
  )
}