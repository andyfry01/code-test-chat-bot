// React
import React, { Component } from 'react';

// Components
import ChatBotHeader from './ChatBotHeader'
import ChatBotChatWindow from './ChatBotChatWindow'

class ChatBot extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chatBotOpen: true
    }
  }
  render() {
    if (!this.state.chatBotOpen) {
      return (
        <div className="chatBotContainer">
          <div className="chatBot__main --closed">
            <ChatBotHeader />
            <ChatBotChatWindow />
          </div>
        </div>
      )
    }
    return (
      <div className="chatBotContainer">
        <div className="chatBot__main --open">
          <ChatBotHeader />
          <ChatBotChatWindow />
        </div>
      </div>
    )  
  }
}

export default ChatBot;

