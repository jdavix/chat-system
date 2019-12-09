import { createContext } from 'react';
import { observable, runInAction, action, decorate } from 'mobx';
import {fetchMe} from '../services/usersService';

class AuthStore {
  token = null
  currentUser = {}

  constructor() {
    this.rehydrateCurrentUser = this.rehydrateCurrentUser.bind(this);
    this.setToken = this.setToken.bind(this);
    this.signout = this.signout.bind(this);
  }

  setToken(token) {
    if (token) {
      this.token = token;
      localStorage.setItem('token', token);
    }
  }

  signout(token) {
    this.token = null;
    this.currentUser = {};
    localStorage.setItem('token', null)
  }

  async rehydrateCurrentUser() {
    let token = localStorage.getItem('token');

    let response = await fetchMe(token);

    runInAction(() => {
      this.currentUser = response.data;
      this.token = token;
    })
    return response.data;
  }
}

decorate(AuthStore, {
  currentUser: observable,
  token: observable,
  setToken: action,
  rehydrateCurrentUser: action,
  signout: action,
})

export default createContext(new AuthStore());