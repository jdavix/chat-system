import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Sidebar from './components/shared/sidebar';
import Conver from './components/Conver';
import {Provider} from './lib/appContext';
import io from "socket.io-client";

function App() {

  const socket = io('localhost:3001');

  return (
    <Provider value={{socket: socket}}>
      <Container>
        <Row>
          <Col md="4" style={{padding: 0}}>
            <Sidebar />
          </Col>
          <Col md="8" style={{padding: 0}}>
            <Conver />
          </Col>
        </Row>
      </Container>
    </Provider>
  );
}

export default App;
