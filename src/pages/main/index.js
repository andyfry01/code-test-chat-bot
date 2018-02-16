// React
import React, { Component } from 'react';

// Components
import BoilerplateText from './components/BoilerplateText';
import ChatBot from './components/ChatBot';

// Assets/styling
import logo from '../../assets/logo.svg';
import css from './css/style.css';

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
          <ChatBot /> 
        </div>
      </div>
    );
  }
}

export default Main;

