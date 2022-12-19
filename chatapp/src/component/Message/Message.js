import React from 'react'
import './message.css'

const Message = ({ user, message, ownClass}) => {
    if(user){
        return (
            <div className={`messageBox ${ownClass}`}>
                {`${user} : ${message}`}
            </div>
          )
    }
    else{
        return (
            <div className={`messageBox ${ownClass}`}>
                {`You : ${message}`}
            </div>
          )
    }
}

export default Message