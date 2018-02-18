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
    this.stepAnimation = this.stepAnimation.bind(this)
    this.startAnimation = this.startAnimation.bind(this)
    this.endAnimation = this.endAnimation.bind(this)
  }

  // start animations on component load
  componentDidMount(){
    this.startAnimation()
  }

  // clears timeouts and resets component animation classes
  componentWillUnmount(){
    this.endAnimation()
  }

  // maps over the array of animation classes in state and updates the 
  // next ellipse to 'animated' while resetting the classes on the other ellispes
  // to cancel their animations
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

  stepAnimation(prevTime, lastIndex) {
    // first, we figure out what time it is, and use that to determine the interval
    // since the last time that an animation frame was requested
    let curTime = Date.now()
    let progress = curTime - prevTime

    // if not enough time has elapsed, we do not animate the ellipses
    if (progress < this.props.animationInterval) {
      ellipsesTimeoutId = window.requestAnimationFrame(() => this.stepAnimation(prevTime, lastIndex))
    } else {
      // if enough time has passed, we increment the index of the ellipse being animated
      // and then call the animateEllipses fxn
      let nextIndex = undefined
      if (lastIndex === this.state.animationClasses.length - 1) {
        nextIndex = 0
      } else {
        nextIndex = lastIndex += 1
      }
      this.animateEllipses(nextIndex)
      ellipsesTimeoutId = window.requestAnimationFrame(() => this.stepAnimation(curTime, nextIndex))
    }
  }

  startAnimation() {
    ellipsesTimeoutId = window.requestAnimationFrame(() => this.stepAnimation(Date.now(), -1))
  }

  // cancel
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



