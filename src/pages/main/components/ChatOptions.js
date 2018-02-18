// React
import React, { Component } from 'react'

// Components
import UserInputGetter from './UserInputGetter'

class ChatOptions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeOption: undefined,
      buttonsActive: true,
      affirmativeOptionToggler: '--active',
      negativeOptionToggler: '--active'
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeOption !== this.state.activeOption) {
      if (this.state.activeOption === 'negative') {
        this.setState(state => {
          return {
            affirmativeOptionToggler: '--invisible',
            negativeOptionToggler: '--inactive',
            buttonsActive: false
          }
        })
        this.props.answerPrompt('no')
      } else {
        this.setState(state => {
          return {
            negativeOptionToggler: '--invisible',
            affirmativeOptionToggler: '--inactive',
            buttonsActive: false
          }
        })
        this.props.answerPrompt('yes')
      }
    }
  }

  handleClick(choice) {
    if (!this.state.buttonsActive) {
      return false
    }
    if (choice === 'no') {
      this.setState(state => {
        return {
          activeOption: 'negative'
        }
      })
      return false
    } 
    this.setState(state => {
      return {
        activeOption: 'affirmative'
      }
    })
    return false
  }

  render() {
    /* Assigns props and click handlers to this.props.children according to what type of user input button 
    is being passed as a child to the ChatOptions component */
    const inputGettersWithProps = React.Children.map(this.props.children, (inputGetter) => {
      if (inputGetter.props.inputType === "no") {
        return React.cloneElement(inputGetter, {
          className: `chatWindow__negativeOption ${this.state.negativeOptionToggler}`,
          copy: "Not now",
          handleClick: () => {this.handleClick('no')}
        });
      }
      if (inputGetter.props.inputType === "yes") {
        return React.cloneElement(inputGetter, {
          className: `chatWindow__affirmativeOption --short ${this.state.affirmativeOptionToggler}`,
          copy: "Yes please",
          handleClick: () => {this.handleClick('yes')}
        });
      }
      if (inputGetter.props.inputType === "followup") {
        return React.cloneElement(inputGetter, {
          className: `chatWindow__affirmativeOption --long ${this.state.affirmativeOptionToggler}`,
          copy: "Actually, I changed my mind",
          handleClick: () => {this.handleClick('yes')}
        });
      }
    });

    return (
      <div className="chatWindow__chatOptions">
        {inputGettersWithProps}
      </div>
    )
  }
}

export default ChatOptions