import React, {useContext} from 'react';
import Messages from '../Messages';
import MessageInput from '../MessageInput';
import AppContext from '../../lib/appContext';
import { leaveChat } from '../../services/groupChatService'
import './conver.css';


export default function Conver(props) {
  const {socket} = useContext(AppContext);

  async function leave(e) {
    e.preventDefault();
    await leaveChat(props.chat._id, props.token);
    props.cleanChat();
  }

  return (
    <div className="conver">
      <div className="top-menu">
        {props.chat.title ? <a className="leave" onClick={leave}>Leave Chat</a> : null}
        <h1>{props.chat.title || 'Select a Chat from the left panel'}</h1>
        {props.chat.title ? <div style={{textAlign:'center', fontSize:'12px'}}><strong>Invited users:</strong> {props.chat.invitations ? props.chat.invitations.join(', ') : null}</div> : null}
      </div>
      <Messages
        socket={socket}
        chat_id={props.chat._id}
        token={props.token}
        currentUser={props.currentUser}
      />
      <MessageInput
        socket={socket}
        chat_id={props.chat._id}
        token={props.token}
        participants={props.chat.participants}
        currentUser={props.currentUser}
      />
    </div>
  )
}