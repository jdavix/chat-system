import React, {useContext} from 'react';
import Messages from '../Messages';
import MessageInput from '../MessageInput';
import AppContext from '../../lib/appContext';

import './conver.css';


export default function Conver(props) {
  const {socket} = useContext(AppContext);

  return (
    <div className="conver">
      <div className="top-menu">
        <h1>{props.chat.title}</h1>
      </div>
      <Messages socket={socket}/>
      <MessageInput socket={socket} chat_id={props.chat._id}/>
    </div>
  )
}