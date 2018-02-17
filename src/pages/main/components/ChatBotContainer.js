// React
import React, { Component } from 'react';

// Components
import ChatBotHeader from './ChatBotHeader'
import ChatBotChatWindow from './ChatBotChatWindow'

class ChatBotContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chatBotOpen: true,
      openCloseToggler: "--open"
    }
    this.toggleChatWindow = this.toggleChatWindow.bind(this)
  }
  toggleChatWindow(){
    if (this.state.chatBotOpen === true) {
      this.setState(state => {
        return {
          chatBotOpen: false,
          openCloseToggler: '--closed'
        }
      })
      return
    }
    this.setState(state => {
      return {
        chatBotOpen: true,
        openCloseToggler: '--open'
      }
    })
    return
  }
  render() {
    return (
      <div className="chatBotContainer">
        <div className={`chatBot__main ${this.state.openCloseToggler}`}>
          <ChatBotHeader toggleChatWindow={this.toggleChatWindow} open={this.state.chatBotOpen} />
          <ChatBotChatWindow toggleChatWindow={this.toggleChatWindow} />
        </div>
      </div>
    )
  }
}

export default ChatBotContainer;

