import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Chat from './pages/chat';
import Landing from './pages/landing';

export default function App() {
  return (
    <Router >
      <Switch>
        <Route path="/chat" exact component={Chat}/>
        <Route path="/landing" index exact component={Landing}/>
      </Switch>
    </Router>
  );
}