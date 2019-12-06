import React from 'react';
import './sidebar.css';
import {Button} from 'reactstrap';
export default function Sidebar(props) {
  return (
      <div className="sidebar">
        <div className="sidebar-header">
          <Button color="secondary" size="sm" onClick={props.newConver}>Create New Conversation</Button>
        </div>
        <div className="groups-container">
          <div className="group-title"><h2>Groups</h2></div>
          <div className="person">Cesar, Maria, Pedro. </div>
          <div className="person">News and News</div>
          <div className="person">React js talk</div>
          <div className="person">Internal messages</div>
          <div className="person">General</div>
          <div className="person">Lunch Time</div>
          <div className="person">Vendors</div>
          <div className="person">Important Noticies</div>
        </div>
        <div className="people-container">
          <div className="group-title"><h2>Direct Messages</h2></div>
          <div className="person">Cesar Bess [online]</div>
          <div className="person">Cesar Bess [online]</div>
          <div className="person">Cesar Bess [online]</div>
          <div className="person">Cesar Bess [offline]</div>
          <div className="person">Cesar Bess [online]</div>
          <div className="person">Cesar Bess [online]</div>
          <div className="person">Cesar Bess [online]</div>
          <div className="person">Cesar Bess [online]</div>
          <div className="person">Cesar Bess [online]</div>
          <div className="person">Cesar Bess [online]</div>
          <div className="person">Cesar Bess [online]</div>
          <div className="person">Cesar Bess [offline]</div>
          <div className="person">Cesar Bess [online]</div>
          <div className="person">Cesar Bess [online]</div>
          <div className="person">Cesar Bess [online]</div>
          <div className="person">Cesar Bess [online]</div>
          <div className="person">Cesar Bess [online]</div>
          <div className="person">Cesar Bess [online]</div>
          <div className="person">Cesar Bess [online]</div>
          <div className="person">Cesar Bess [offline]</div>
          <div className="person">Cesar Bess [online]</div>
          <div className="person">Cesar Bess [online]</div>
          <div className="person">Cesar Bess [online]</div>
          <div className="person">Cesar Bess [online]</div>
          <div className="person">Cesar Bess [online]</div>
          <div className="person">Cesar Bess [online]</div>
          <div className="person">Cesar Bess [online]</div>
          <div className="person">Cesar Bess [offline]</div>
          <div className="person">Cesar Bess [online]</div>
          <div className="person">Cesar Bess [online]</div>
          <div className="person">Cesar Bess [online]</div>
          <div className="person">Cesar Bess [online]</div>
        </div>
      </div>
    )
}