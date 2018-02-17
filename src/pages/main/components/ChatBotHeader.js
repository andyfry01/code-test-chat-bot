// React
import React from 'react';

// Assets
import x from '../../../assets/x.svg'
import chevronUp from '../../../assets/chevron-up.svg'

const ChatBotHeader = (props) => {
  let icon = undefined
  let chatWindowStatus = undefined
  if (props.open === true) {
    icon = x
    
  } else {
    icon = chevronUp
  }
  return (
    <div className="chatbot__header">
      <p className="chatbot__headerText">Chat</p>
      <div className="chatbot__toggler">
        <img  className="chatbot__togglerIcon" 
              src={icon} 
              alt="chatbot open and close button" 
              onClick={props.toggleChatWindow}/>
      </div>
    </div>
  );
}

export default ChatBotHeader;
