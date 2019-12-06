import React, {useState} from 'react';
import { Container, Row, Col } from 'reactstrap';
import Sidebar from './components/shared/sidebar';
import Conver from './components/Conver';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Form, Input} from '@rocketseat/unform';
import {Provider} from './lib/appContext';
import io from 'socket.io-client';
import {saveGroupChat} from './services/groupChatService';

function App() {

  const socket = io('localhost:3001');

 const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const handleSubmit = async (fields) => {
    let emailList = fields.emailList;
    let title = fields.title;
    emailList = emailList.replace(/\s/g,'');
    emailList = emailList.split(",")

    let resp;
    try {
      resp = await saveGroupChat({title: title, invited_emails: emailList});
      console.log("11")
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
            <Conver />
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
}

export default App;
