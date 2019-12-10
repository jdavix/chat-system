import React, {useEffect, useState} from 'react';
import './sidebar.css';
import {Button} from 'reactstrap';
import {fetchChats} from '../../../services/groupChatService';

export default function Sidebar(props) {

  let [groups, setGroups] = useState([]);
  let [directs, setDirects] = useState([]);
  let {currentUser, token, signout, cleanChat} = props;

  async function loadGroups() {
    let data = await fetchChats({chat_type: 'group', user_id: currentUser._id}, token)
    setGroups(data.data);
  }

  async function loadDirects() {
    let data = await fetchChats({chat_type: 'direct', user_id: currentUser._id}, token)
    setDirects(data.data);
  }

  useEffect(()=>{
    loadGroups();
    loadDirects();
  }, [props.chat])

  function personClassName(item) {
    return `person ${item.title === props.chat.title ? 'active' : null}`
  }

  function setCurrentChat(item) {
    return (e)=>{
      e.preventDefault();
      props.setChat(item);
    }
  }

  function signOut(e) {
    e.preventDefault();
    console.log("logout", signout)
    signout();
    cleanChat();
  }

  return (
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="session-title">
            <span>You are signed in as {currentUser.username},</span> <a onClick={signOut}>Sign out</a>
          </div>
        </div>
        <div className="sidebar-header">
          <Button color="secondary" size="sm" onClick={props.newConver}>Create New Conversation</Button>
        </div>
        <div className="groups-container">
          <div className="group-title"><h2>Groups</h2></div>
          {groups.map((group)=> {
            return <div className={personClassName(group)} onClick={setCurrentChat(group)}>{group.title}</div>
          })}
        </div>
        <div className="people-container">
          <div className="group-title"><h2>Direct Messages</h2></div>
          {directs.map((direct)=> {
            return <div className={personClassName(direct)} onClick={setCurrentChat(direct)}>{direct.title}</div>
          })}
        </div>
      </div>
    )
}