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

const App = observer((props) => {

  const authStore = useContext(AuthStore);
  let { token,
        currentUser,
        setToken,
        signout,
        rehydrateCurrentUser,
        setCurrentUser } = authStore;

  const [loading, setLoading] = useState(true);

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
        >
          <Chat
            currentUser={currentUser}
            signout={signout}
            token={token}
          />
        </PrivateRoute>
        <Route path="/" exact render={(props)=>{
          if (token) {
            return <Redirect to={{
              pathname: '/chat',
              state: {from: props.location}
            }} />
          }
          return <Landing
                   {...props}
                   setToken={setToken}
                   loading={loading}
                   setLoading={setLoading}
                   setCurrentUser={setCurrentUser}
                 />
        }}/>
      </Switch>
    </Router>
  );
})

export default App;

function PrivateRoute({ children, ...props }) {
  const { token } = props;
  return (
    <Route
      {...props}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}