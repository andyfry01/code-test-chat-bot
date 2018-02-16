// React
import React from 'react';

// Assets
import x from '../../../assets/x.svg'
import chevronUp from '../../../assets/chevron-up.svg'

const ChatBotHeader = () => {
  return (
    <div className="chatbot__header">
      <p className="chatbot__headerText">Chat</p>
      <div className="chatbot__toggler">
        <img className="chatbot__togglerIcon" src={x} alt="chatbot open and close button" />
      </div>
    </div>
  );
}

export default ChatBotHeader;
