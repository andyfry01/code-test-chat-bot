// React
import React, {Component} from 'react';

// Components
import TypingIndicator from './TypingIndicator'
import UserInputGetter from './UserInputGetter'
import PlainMessage from './PlainMessage'

// Chatbot script
import chatScript from '../etc/chatScript'

let chatTimeoutId = undefined

class ChatBotChatWindow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentScriptPath: undefined,
      chatMessages: []
    }
    this.answerPrompt = this.answerPrompt.bind(this)
    this.stepScriptPath = this.stepScriptPath.bind(this)
    this.triggerScriptStep = this.triggerScriptStep.bind(this)
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.currentScriptPath !== this.state.currentScriptPath) {
      this.stepScriptPath(nextState.currentScriptPath, -1)
    }
    return true
  }

  answerPrompt(answer) {
    if (answer === 'no') {
      this.setState(state => {
        return {
          currentScriptPath: 'negative'
        }
      })
      return
    } 
    this.setState(state => {
      return {
        currentScriptPath: 'affirmative'
      }
    })
    return
  }

  stepScriptPath(pathName, stepNum) {
    window.clearTimeout(chatTimeoutId)
    let nextStep = stepNum + 1
    this.triggerScriptStep(pathName, nextStep)
  }

  triggerScriptStep(pathName, stepNum) {

    let chatMessages = this.state.chatMessages
    let chatScriptSteps = chatScript.scriptPathsFast[pathName]
    let currentScriptStep = chatScriptSteps[stepNum]

    if (chatScriptIsNotOver(currentScriptStep, this)) {

      let stepName = currentScriptStep.name
      let stepDuration = currentScriptStep.duration
      let nextMessage = undefined

      if (chatMessages.length > 0) {
        chatMessages = removeTypingIndicator(chatMessages)
      }
      if (stepName === 'showIndicator') {
        nextMessage = <TypingIndicator key={Date.now()} animationInterval={500} />
      } 
      if (stepName === 'showMessage1') {
        nextMessage = <PlainMessage key={Date.now()} 
                                    className="chatWindow__companyMessage" 
                                    copy={chatScript.messages.message1} />
      }
      if (stepName === 'showMessage2') {
        nextMessage = <PlainMessage key={Date.now()} 
                                    className="chatWindow__companyMessage" 
                                    copy={chatScript.messages.message2} />
      }
      if (stepName === 'displayFollowUpPrompt') {
        nextMessage = <div className="chatWindow__chatOptions" key={Date.now()} > 
                        <UserInputGetter  className="chatWindow__affirmativeOption" 
                                          copy="Actually, I changed my mind" 
                                          handleClick={() => { this.answerPrompt('yes') }} /> 
                      </div>
      }
      if (nextMessage !== undefined) {
        chatMessages.push(nextMessage)
      }

      this.setState(state => {
        return {
          chatMessages: chatMessages
        }
      }) 
      scrollChatWindow()
      chatTimeoutId = window.setTimeout(() => { 
        this.stepScriptPath(pathName, stepNum)
      }, stepDuration)
    }

    function scrollChatWindow(){
      let chatWindow = document.getElementsByClassName("chatWindow")[0]
      chatWindow.scrollTop = chatWindow.scrollHeight
    }

    function removeTypingIndicator(chatMessages) {
      return chatMessages.filter(chatItem => chatItem.type.name !== 'TypingIndicator')
    }
    
    function chatScriptIsNotOver(currentScriptStep, that){
      if (currentScriptStep === undefined) {
        window.clearTimeout(chatTimeoutId)
        return false
      }
      if (currentScriptStep.name === 'closeWindow') {
        chatMessages = removeTypingIndicator(chatMessages)
        that.setState(state => {
          return {chatMessages: chatMessages}
        }, () => {
          that.props.toggleChatWindow()
          window.clearTimeout(chatTimeoutId)
          return false
        })
      } 
      return true
    }

  }

  render(){
    // used to move chat spacer on addition of new message
    // add 2 to accommondate two messages already in chat window
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
        <div className="chatWindow__spacer" style={{ gridRow: `${chatListLength + 1} / ${chatListLength + 2}` }}></div>
      </div>
    );
  }
}

export default ChatBotChatWindow;
