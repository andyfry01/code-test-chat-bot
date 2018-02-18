// React
import React, { Component } from 'react';

// Components
import BoilerplateText from './components/BoilerplateText';
import ChatBotContainer from './components/ChatBotContainer';

// Assets/styling
import logo from '../../assets/logo.svg';
import main from './css/main.css';
import css from './css/vars-and-reset.css';

class Main extends Component {
  render() {
    return (
      <div>
        <div className="main">
          <div className="main__blurEffect"></div>
          <div className="main__content">
            <img className="main__logo" src={logo} alt="etrade logo" />
            <BoilerplateText />
          </div>
          <ChatBotContainer /> 
        </div>
      </div>
    );
  }
}

export default Main;

