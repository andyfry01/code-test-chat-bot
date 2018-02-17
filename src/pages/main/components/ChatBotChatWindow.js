// React
import React, {Component} from 'react';

// Components
import TypingIndicator from './TypingIndicator'
import UserInputGetter from './UserInputGetter'
import PlainMessage from './PlainMessage'

let chatTimeoutId = undefined

class ChatBotChatWindow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: {
        message1: 'Great! We\'ll get you connected to a representative',
        message2: 'No problem! If you decide you need me, just click "Contact Us"'
      },
      executionPaths: {
        affirmative: [{ name: 'showIndicator', duration: 3500}, 
                      { name: 'showMessage1', duration: 4000}, 
                      { name: 'showIndicator', duration: 3500}, 
                      { name: 'closeWindow', duration: null}],

          negative:  [{ name: 'showMessage2', duration: 1500}, 
                      { name: 'displayFollowUpPrompt', duration: null}]
      },
      executionPathsFast: {
        affirmative: [{ name: 'showIndicator', duration: 500}, 
                      { name: 'showMessage1', duration: 500}, 
                      { name: 'showIndicator', duration: 500}, 
                      { name: 'closeWindow', duration: null}],

          negative:  [{ name: 'showMessage2', duration: 500}, 
                      { name: 'displayFollowUpPrompt', duration: null}]
      },
      currentExecutionPath: undefined,
      chatMessages: []
    }
    this.answerPrompt = this.answerPrompt.bind(this)
    this.stepExecutionPath = this.stepExecutionPath.bind(this)
    this.triggerExecutionStep = this.triggerExecutionStep.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.currentExecutionPath !== this.state.currentExecutionPath) {
      this.stepExecutionPath(nextState.currentExecutionPath, -1)
    }
    return true
  }

  answerPrompt(answer) {
    if (answer === 'no') {
      return this.setState(state => {
        return {
          currentExecutionPath: 'negative'
        }
      })
    } 
    if (answer === 'yes') {
      return this.setState(state => {
        return {
          currentExecutionPath: 'affirmative'
        }
      })
    }
  }

  stepExecutionPath(pathName, stepNum) {
    window.clearTimeout(chatTimeoutId)
    let nextStep = stepNum + 1
    this.triggerExecutionStep(pathName, nextStep)
  }

  triggerExecutionStep(pathName, stepNum) {
    let chatMessages = this.state.chatMessages
    if (chatMessages.length > 0) {
      chatMessages = chatMessages.filter(chatItem => chatItem.type.name !== 'TypingIndicator')
    }
    let curState = this.state
    let executionSteps = curState.executionPaths[pathName]
    let currentExecutionStep = executionSteps[stepNum]
    if (currentExecutionStep === undefined) {
      window.clearTimeout(chatTimeoutId)
      return false
    } 
    let stepName = currentExecutionStep.name
    let nextMessage = undefined

    if (stepName === 'showIndicator') {
      nextMessage = <TypingIndicator key={Date.now() + 1} animationInterval={500} />
    } 
    if (stepName === 'showMessage1') {
      nextMessage = <PlainMessage className="chatWindow__companyMessage" copy={this.state.messages.message1}/>
    }
    if (stepName === 'showMessage2') {
      nextMessage = <PlainMessage className="chatWindow__companyMessage" copy={this.state.messages.message2}/>
    }
    if (stepName === 'displayFollowUpPrompt') {
      nextMessage = <div className="chatWindow__chatOptions"> 
                      <UserInputGetter  key={Date.now()} 
                                        className="chatWindow__affirmativeOption" 
                                        copy="Actually, I changed my mind" 
                                        handleClick={() => { this.answerPrompt('yes') }} /> 
                    </div>
    }
    if (stepName === 'closeWindow') {
      this.props.toggleChatWindow()
      window.clearTimeout(chatTimeoutId)
      return false
    }
    chatMessages.push(nextMessage)
    this.setState(state => {
      return {
        chatMessages: chatMessages
      }
    }, () => {
      let chatWindow = document.getElementsByClassName("chatWindow")[0];
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }) 
    chatTimeoutId = window.setTimeout(() => { this.stepExecutionPath(pathName, stepNum)}, executionSteps[stepNum].duration)
  }

  render(){
    // accommondate two messages already in chat window
    let chatListLength = this.state.chatMessages.length + 2
    return (
      <div className="chatWindow">
        <PlainMessage className="chatWindow__companyMessage" 
                      copy="Hi! Do you have any questions I can answer for you?"/>
        <div className="chatWindow__chatOptions">
          <UserInputGetter  className="chatWindow__negativeOption" 
                            copy="Not now" 
                            handleClick={() => { this.answerPrompt('no') }} />
          <UserInputGetter  className="chatWindow__affirmativeOption" 
                            copy="Yes please" 
                            handleClick={() => { this.answerPrompt('yes') }} />
        </div>
        {this.state.chatMessages.map(message => message)}
        <div className="chatWindow__spacer" style={{gridRowStart: `${chatListLength + 1}`, gridRowEnd: `${chatListLength + 2}`}}></div>
      </div>
    );
  }
}

export default ChatBotChatWindow;
