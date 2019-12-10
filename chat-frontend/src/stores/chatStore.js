import { createContext } from 'react';
import { observable, runInAction, action, decorate } from 'mobx';
import { fetchChat } from '../services/groupChatService';

class ChatStore {
  currentChat = {}

  constructor() {
    this.rehydrateChat = this.rehydrateChat.bind(this);
    this.setChat = this.setChat.bind(this);
  }

  setChat(chat) {
    if (chat) {
      this.currentChat = chat;
      localStorage.setItem('currentChatId', chat._id);
    }
  }

  async rehydrateChat(token) {
    let id = localStorage.getItem('currentChatId');
    if (!id) return null ;

    let response;
    try {
      response = await fetchChat(id, token);
      runInAction(() => {
        this.currentChat = response.data;
      })
    } catch(err) {
      response = err.response;
    }

    return response.data;
  }
}

decorate(ChatStore, {
  currentChat: observable,
  setChat: action,
  rehydrateChat: action,
})

export default createContext(new ChatStore());
