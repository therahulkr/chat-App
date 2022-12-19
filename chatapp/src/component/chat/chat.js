import React, { useEffect, useState } from 'react'
import {user} from "../Join/Join"
import socketIo from "socket.io-client"
import "./chat.css"
import Message from "../Message/Message"
import ReactScrollToBottom from 'react-scroll-to-bottom'


const ENDPOINT = "http://localhost:5000";
let socket;

const Chat = () => {

  const [id, setid] = useState('');
  const [messages,setMessages] = useState([]);

  const send = () => {
    const message = document.getElementById('chatInput').value;
    socket.emit('message', { message,id });
    document.getElementById('chatInput').value = "";
  }
  
  useEffect(()=>{
    socket = socketIo(ENDPOINT, {transports : ['websocket'] });
    
    socket.on('connect',()=>{
      console.log('connected')
      setid(socket.id);
    })

    socket.emit('joined',{ user })

    socket.on('welcome',(data)=>{
      setMessages([...messages, data]);
      console.log(data.user,data.message);
    })

    socket.on('userJoined',(data)=>{
      setMessages([...messages, data]);
      console.log(data.user,data.message);
    })

    socket.on('leave', (data)=>{
      setMessages([...messages, data]);
      console.log(data.user,data.message);
    })

    return () => {
      socket.emit('left');
      socket.off();
    }
  },[])

  useEffect(() =>{
    socket.on('sendMessage', (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message, data.id);
    })
    return () => {
      socket.off();
    }
  }, [messages])

  return (
    <div className='chatPage'>
      <div className='chatContainer'>
        <div className='header'><h3 className='headerName'>{user}</h3><h3 className="headerName">X</h3></div>
        <ReactScrollToBottom className='chatBox'>
          {messages.map((item,i) => <Message user = {item.id===id?'':item.user} message={item.message} ownClass={item.id!==id?"left":"right"}/>)}
        </ReactScrollToBottom>
        <div className='inputBox'>
          <input  placeholder='type here...' type="text" id="chatInput"/>
          <button onClick={send} className='sendBtn'>Send</button>
        </div>
      </div>
    </div>
  )
}

export default Chat