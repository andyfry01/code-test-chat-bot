// React
import React, {Component} from 'react';

// Components
import TypingIndicator from './TypingIndicator'
import UserInputGetter from './UserInputGetter'
import PlainMessage from './PlainMessage'
import ChatOptions from './ChatOptions'

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

  // if the script path changes (either undefined -> affirmative, affirmative -> negative, etc.)
  // we trigger the execution of that relevant script path
  componentDidUpdate(nextProps, prevState) {
    if (prevState.currentScriptPath !== this.state.currentScriptPath) {
      this.stepScriptPath(this.state.currentScriptPath, -1)
    }
  }

  // takes user input and sets script path in state
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

  // Increments the step number in a script path and calls triggerScriptStep
  stepScriptPath(pathName, stepNum) {
    window.clearTimeout(chatTimeoutId)
    let nextStep = stepNum + 1
    this.triggerScriptStep(pathName, nextStep)
  }

  /* Determines which script step to execute and pushes the relevant component for
  that step into this.state.chatMessages
  this.state.chatMessages is rendered within the chat window */
  triggerScriptStep(pathName, stepNum) {

    // first, we grab the current array of chat messages
    let chatMessages = this.state.chatMessages

    // then we figure out which chat script path we're following and what step of the
    // script that we're on
    let chatScriptSteps = chatScript.scriptPaths[pathName]
    let currentScriptStep = chatScriptSteps[stepNum]

    // first, check if the script is over
    if (chatScriptIsNotOver(currentScriptStep, this)) {

      // if it's not, we get the name of the next script step and the duration of that step
      let stepName = currentScriptStep.name
      let stepDuration = currentScriptStep.duration

      // before we add any messages, we get rid of any typing indicators 
      // that may be in the chatMessage array
      if (chatMessages.length > 0) {
        chatMessages = removeTypingIndicator(chatMessages)
      }
      
      // now, we determine what component to render for the current step in the script
      let nextMessage = undefined
      
      if (stepName === 'showIndicator') {
        nextMessage = <TypingIndicator key={`TypingIndicator-${Date.now()}`} animationInterval={500} />
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
        nextMessage = <ChatOptions answerPrompt={this.answerPrompt} key={Date.now()}>
                        <UserInputGetter inputType="followup" />
                      </ChatOptions>
      }

      // after determining the component to render, we push it into chatMessages
      if (nextMessage !== undefined) {
        chatMessages.push(nextMessage)
      }

      // and finally, we update this.state.chatMessages with the updated chatMessages array
      // containing the next message
      this.setState(state => {
        return {
          chatMessages: chatMessages
        }
      }) 

      // after updating state, we scroll the chat window to the bottom to accomodate the 
      // new message
      scrollChatWindow()

      // and the process begins again
      chatTimeoutId = window.setTimeout(() => { 
        this.stepScriptPath(pathName, stepNum)
      }, stepDuration)
    }

    function scrollChatWindow(){
      let chatWindow = document.getElementsByClassName("chatWindow")[0]
      chatWindow.scrollTop = chatWindow.scrollHeight
    }

    function removeTypingIndicator(chatMessages) {
      return chatMessages.filter(chatItem => chatItem.key.indexOf('TypingIndicator') < 0)
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
          return true
        })
      } 
      return true
    }

  }

  render(){
    // used to move chat spacer on addition of new message
    // add 2 to accommondate two messages already in chat window on component mount
    let chatListLength = this.state.chatMessages.length + 2
    return (
      <div className="chatWindow">
        <PlainMessage className="chatWindow__companyMessage" 
                      copy="Hi! Do you have any questions I can answer for you?"/>
        <ChatOptions answerPrompt={this.answerPrompt} >
          <UserInputGetter inputType="no" />
          <UserInputGetter inputType="yes" />
        </ChatOptions>
        {this.state.chatMessages.map(message => message)}
        <div className="chatWindow__spacer" style={{ gridRow: `${chatListLength + 1} / ${chatListLength + 2}` }}></div>
      </div>
    );
  }
}

export default ChatBotChatWindow;
