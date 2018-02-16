// React
import React, {Component} from 'react';

// Assets
import x from '../../../assets/x.svg'
import chevronUp from '../../../assets/chevron-up.svg'

class ChatBotHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true,
      icon: x
    }
    this.toggleChatHeader = this.toggleChatHeader.bind(this)
  }

  toggleChatHeader() {
    if (this.state.open === false) {
      this.props.toggleChatWindow('open')
      return this.setState(state => {
        return {
          open: true,
          icon: x
        }
      })
    }
    this.props.toggleChatWindow('closed')
    return this.setState(state => {
      return {
        open: false,
        icon: chevronUp
      }
    })
  }

  render(){
    return (
      <div className="chatbot__header">
        <p className="chatbot__headerText">Chat</p>
        <div className="chatbot__toggler">
          <img  className="chatbot__togglerIcon" 
                src={this.state.icon} 
                alt="chatbot open and close button" 
                onClick={this.toggleChatHeader}/>
        </div>
      </div>
    );
  }
}

export default ChatBotHeader;
