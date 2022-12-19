import React, { useState } from 'react'
import "./Join.css"
import { Link } from 'react-router-dom'

let user;

const Join = () => {

  const [name,setName] = useState("");
  console.log(name)

  const sendUser = () => {
    user = document.getElementById('joinInput').value;
    document.getElementById('joinInput').value = '';
  }

  return (
    <div className='JoinPage'>
      <div className='JoinContainer'>
         <h1>Quick Chat</h1>
         <input onChange={(e)=>setName(e.target.value)} placeholder='Enter your name...' type="text" id="joinInput"/>
         {
          !name ?
          <button className='joinbtn' disabled>Log In</button> :
          <Link to='/chats'><button onClick={sendUser} className='joinbtn'>Log In</button></Link>
        }
      </div>
    </div>
  )
}

export  default Join
export {user}