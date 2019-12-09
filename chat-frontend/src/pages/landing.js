import React, {useState, useEffect} from 'react';
import { Col, Row } from 'reactstrap';
import {Form, Input} from '@rocketseat/unform';
import {signin, signup} from '../services/usersService';

import './landing.css';

function Landing(props) {
  const [signupErrors, setErrors] = useState({})
  const {setToken, setCurrentUser, setLoading} = props;

  const token = localStorage.getItem('token')

  useEffect(()=>{
    if (!token) {
      setLoading(false) ;
    }
  }, [])


  async function register(fields, {resetForm}) {
    try {
      let data = await signup(fields);
      setToken(data.data.token);
      resetForm();
    } catch(err) {
      if (err.response) {
        setErrors(err.response.data.meta);
      } else {
        console.log(err)
      }
    }
  }

  async function login(fields, {resetForm}) {
    try {
      let data = await signin(fields);
      setCurrentUser(data.data);
      setToken(data.data.token);
    } catch(err) {
      if (err.response) {
        alert(err.response.data.message)
      } else {
        console.log(err)
      }
    }
    resetForm();
  }

  return (
    props.loading ? (<h3 style={{width: '100%', textAlign: 'center', marginTop: '20%'}}>Loading...</h3>) :
    <Row>
      <Col md="4" className="left-side-banner">
        <div className="inner-side-container">
          <h1>Welcome!</h1>
          <h2>Login or Register to start chatting with your contacts.</h2>
        </div>
      </Col>
      <Col md="8">
        <div className="landing-container">
        <Row>
          <Form className="form-inline"
                onSubmit={login}
          >
            <div className="form-group">
              <h5>Login with Email and Password</h5>
            </div>
            <div className="form-group">
              <Input name="email" className="form-control" placeholder="youremail@example.com"/>
            </div>
            <div className="form-group">
              <Input name="password" className="form-control" type="password" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </Form>
        </Row>
        <Row className="register-title">
          <h4>Register with Email and Password</h4>
        </Row>
        <Row>
          <Form className="register-form"
                onSubmit={register}
          >
            <div className="form-group">
              <label>Email</label>
              <Input className="form-control" name="email"/>
            </div>
            <div className="form-group">
              <label>Username</label>
              <Input className="form-control" name="username"/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <Input className="form-control" name="password" type="password" />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <Input className="form-control" name="passwordConfirmation" type="password" />
            </div>
            <button className="btn btn-primary">Register</button>
          </Form>
        </Row>
        </div>
      </Col>
    </Row>
  );
}

export default Landing;