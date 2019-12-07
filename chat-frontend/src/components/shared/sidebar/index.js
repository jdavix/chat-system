import React, {useEffect, useState} from 'react';
import './sidebar.css';
import {Button} from 'reactstrap';
import {fetchChats} from '../../../services/groupChatService';

export default function Sidebar(props) {

  let [groups, setGroups] = useState([]);
  let [directs, setDirects] = useState([]);

  async function loadGroups() {
    let data = await fetchChats({chat_type: 'group', user_id: '5de8160ebf75f3a5fe2e2044'})
    setGroups(data.data);
  }

  async function loadDirects() {
    let data = await fetchChats({chat_type: 'direct', user_id: '5de8160ebf75f3a5fe2e2044'})
    setDirects(data.data);
  }

  useEffect(()=>{
    loadGroups();
    loadDirects();
  }, [])

  return (
      <div className="sidebar">
        <div className="sidebar-header">
          <Button color="secondary" size="sm" onClick={props.newConver}>Create New Conversation</Button>
        </div>
        <div className="groups-container">
          <div className="group-title"><h2>Groups</h2></div>
          {groups.map((group)=> {
            return <div className="person">{group.title}</div>
          })}
        </div>
        <div className="people-container">
          <div className="group-title"><h2>Direct Messages</h2></div>
          {directs.map((direct)=> {
            return <div className="person">{direct.title}</div>
          })}
        </div>
      </div>
    )
}