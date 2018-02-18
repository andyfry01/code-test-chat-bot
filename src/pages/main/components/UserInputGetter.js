import React from 'react'

const UserInputGetter = (props) => {
  return <div className={props.className} onClick={props.handleClick}>{props.copy}</div>
} 

export default UserInputGetter
