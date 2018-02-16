// React
import React from 'react';

// Components
import TypingIndicator from './TypingIndicator'

const ChatBotChatWindow = () => {
  return (
    <div className="chatWindow">
      <div className="chatWindow__companyMessage">Hi! Do you have any questions I can answer for you?</div>
      <div className="chatWindow__chatOptions">
        <div className="chatWindow__notNow">Not now</div>
        <div className="chatWindow__yesPlease">Yes please</div>
      </div>
      <TypingIndicator animationInterval={500} />
    </div>
  );
}

export default ChatBotChatWindow;
