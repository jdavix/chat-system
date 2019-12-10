import React, {useContext} from 'react';
import Messages from '../Messages';
import MessageInput from '../MessageInput';
import AppContext from '../../lib/appContext';

import './conver.css';


export default function Conver(props) {
  const {socket} = useContext(AppContext);
  console.log("Conver render: ", socket);
  return (
    <div className="conver">
      <div className="top-menu">
        <h1>{props.chat.title || 'Select a Chat from the left panel'}</h1>
        <div style={{textAlign:'center', fontSize:'12px'}}><strong>Invited users:</strong> {props.chat.invitations ? props.chat.invitations.join(', ') : null}</div>
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