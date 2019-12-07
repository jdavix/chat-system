import React, { useState, useContext, useEffect } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { Container, Row, Col } from 'reactstrap';
import Sidebar from './components/shared/sidebar';
import Conver from './components/Conver';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Form, Input} from '@rocketseat/unform';
import {Provider} from './lib/appContext';
import io from 'socket.io-client';
import {saveGroupChat} from './services/groupChatService';
import ChatStore from './stores/chatStore';

let initialSocket = io('localhost:3001');

const App = observer((props)=> {

  const [modal, setModal] = useState(false);
  const [socket, setSocket] = useState(initialSocket);

  const toggle = () => setModal(!modal);

  const chatStore = useContext(ChatStore);
  let { currentChat, setChat } = chatStore;

  useEffect(()=>{
    chatStore.rehydrateChat().then((chat)=>{
    })
  }, [])

  useEffect(()=>{
    if (currentChat._id) {
      let skt = io('localhost:3001');
      let chat = toJS(currentChat);
      skt.emit('JOIN', {chat, user_id: '5de8160ebf75f3a5fe2e2044'});
      setSocket(skt);
      console.log("Joining...: ", chat._id);
    }
  }, [currentChat]);

  const handleSubmit = async (fields) => {
    let emailList = fields.emailList;
    let title = fields.title;
    emailList = emailList.replace(/\s/g,'');
    emailList = emailList.split(",")

    let resp;
    try {
      resp = await saveGroupChat({title: title, invited_emails: emailList});
      setChat(resp.data);
    } catch(e) {
      resp = e.response;
    }
    
    if (resp.status > 300) {
      alert(resp.data.message);
    } else {
      console.log(resp.data);
    }
    toggle()
  }

  return (
    <Provider value={{socket: socket}}>
      <Container>
        <Row>
          <Col md="4" style={{padding: 0}}>
            <Sidebar newConver={toggle}/>
          </Col>
          <Col md="8" style={{padding: 0}}>
            <Conver chat={currentChat}/>
          </Col>
        </Row>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>New Conversation</ModalHeader>
          <Form onSubmit={handleSubmit}>
            <ModalBody>
                <div className="form-group">
                  <Input className="form-control"
                         name="title"
                         placeholder="Conversation name"
                  />
                  <small className="form-text text-muted">This field is required</small>
                </div>
                <div className="form-group">
                  <Input className="form-control"
                         name="emailList"
                         placeholder="address1@email.com, ..."
                  />
                  <small className="form-text text-muted">Type your friend(s) addressses, comma separated.</small>
                </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary">Create & Invite</Button>{' '}
              <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </Container>
    </Provider>
  );
})

export default App;
