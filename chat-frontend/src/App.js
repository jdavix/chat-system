import React, {useContext, useEffect, useState} from "react";
import { observer } from 'mobx-react-lite';
import AuthStore from './stores/authStore';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Chat from './pages/chat';
import Landing from './pages/landing';

export function App(props) {
  const [loading, setLoading] = useState(true);

  const authStore = useContext(AuthStore);
  let { token, currentUser, setToken, signout, rehydrateCurrentUser } = authStore;

  useEffect(()=>{
    rehydrateCurrentUser().then((resp)=>{
      console.log("rehydratedUser: ", resp)
      setLoading(false)
    });
  }, [])

  return (
    <Router>
      <Switch>
        <PrivateRoute
          path="/chat"
          index exact
          token={token}
          loading={loading}
        >
          <Chat
            currentUser={currentUser}
            signout={signout}
            token={token}
          />
        </PrivateRoute>
        <Route path="/landing" exact render={(props)=>{
          if (token) {
            return <Redirect to={{
              pathname: '/chat',
              state: {from: props.location}
            }} />
          }
          return <Landing {...props} setToken={setToken}/>
        }}/>
      </Switch>
    </Router>
  );
}

export default observer(App);

function PrivateRoute({ children, ...props }) {
  const {loading, token} = props;
  console.log("TOKEN?: ", token)
  return (
    <Route
      {...props}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/landing",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}