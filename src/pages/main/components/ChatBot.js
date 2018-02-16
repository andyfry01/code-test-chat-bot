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
    this.toggleChatWindow = this.toggleChatWindow.bind(this)
  }
  toggleChatWindow(chatWindowStatus){
    if (chatWindowStatus === 'closed') {
      return this.setState(state => {
        return {
          chatBotOpen: false
        }
      })
    }
    return this.setState(state => {
      return {
        chatBotOpen: true
      }
    })
  }
  render() {
    if (!this.state.chatBotOpen) {
      return (
        <div className="chatBotContainer">
          <div className="chatBot__main --closed">
            <ChatBotHeader toggleChatWindow={this.toggleChatWindow} />
            <ChatBotChatWindow />
          </div>
        </div>
      )
    }
    return (
      <div className="chatBotContainer">
        <div className="chatBot__main --open">
          <ChatBotHeader toggleChatWindow={this.toggleChatWindow} />
          <ChatBotChatWindow />
        </div>
      </div>
    )  
  }
}

export default ChatBot;

