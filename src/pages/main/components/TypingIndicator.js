// React
import React, { Component } from 'react';

// Styling
import typingIndicator from '../css/typing-indicator.css';
 
let ellipsesTimeoutId = undefined

class TypingIndicator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      animationClasses: ['', '', '']
    }
    this.animateEllipses = this.animateEllipses.bind(this)
    this.step = this.step.bind(this)
    this.startAnimation = this.startAnimation.bind(this)
    this.endAnimation = this.endAnimation.bind(this)
  }

  componentDidMount(){
    this.startAnimation()
  }

  animateEllipses(index) {
    let updatedAnimationClasses = this.state.animationClasses.map((animationClass, animationIndex) => {
      if (animationIndex === index) {
        return '--ellipseAnimate'
      }
      return ''
    })
    this.setState((state) => {
      return {
        animationClasses: updatedAnimationClasses
      }
    })
  }

  step(prevTime, lastIndex) {
    let nextIndex = undefined
    let curTime = Date.now()
    let progress = curTime - prevTime
    if (progress < this.props.animationInterval) {
      ellipsesTimeoutId = window.requestAnimationFrame(() => this.step(prevTime, lastIndex))
    } else {
      if (lastIndex === this.state.animationClasses.length - 1) {
        nextIndex = 0
      } else {
        nextIndex = lastIndex += 1
      }
      this.animateEllipses(nextIndex)
      ellipsesTimeoutId = window.requestAnimationFrame(() => this.step(curTime, nextIndex))
    }
  }

  startAnimation() {
    ellipsesTimeoutId = window.requestAnimationFrame(() => this.step(Date.now(), -1))
  }

  endAnimation() {
    window.cancelAnimationFrame(ellipsesTimeoutId)
    this.setState(state => {return { animationClasses: ['', '', ''] }})
  }

  render() {
    return (
      <div className="typingIndicator">
        <div className={`typingIndicator__ellipse ${this.state.animationClasses[0]}`}></div>
        <div className={`typingIndicator__ellipse ${this.state.animationClasses[1]}`}></div>
        <div className={`typingIndicator__ellipse ${this.state.animationClasses[2]}`}></div>
      </div>
    )
  }
}

export default TypingIndicator



