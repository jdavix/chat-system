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

  async rehydrateChat() {
    let id = localStorage.getItem('currentChatId');
    console.log("ID from rehydrate: ", id);

    let response = await fetchChat(id);

    runInAction(() => {
      this.currentChat = response.data;
    })
    return response.data;
  }
}

decorate(ChatStore, {
  currentChat: observable,
  setChat: action,
  rehydrateChat: action,
})

export default createContext(new ChatStore());
