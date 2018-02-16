// React
import React from 'react';

const ChatBotChatWindow = () => {
  return (
    <div className="chatWindow">
      <div className="chatWindow__companyMessage">Hi! Do you have any questions I can answer for you?</div>
      <div className="chatWindow__chatOptions">
        <div className="chatWindow__notNow">Not now</div>
        <div className="chatWindow__yesPlease">Yes please</div>
      </div>
      <div className="typingIndicator">
        <div className="typingIndicator__ellipse"></div>
        <div className="typingIndicator__ellipse"></div>
        <div className="typingIndicator__ellipse"></div>
      </div>
    </div>
  );
}

export default ChatBotChatWindow;
