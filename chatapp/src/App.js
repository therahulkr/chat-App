import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Join from './component/Join/Join.js';
import Chat from './component/chat/chat'



function App() {

  return (
    
      <Router>
        <Routes>
          <Route path='/' element={<Join/>}/>
          <Route path='/chats' element={<Chat/>}/>
        </Routes>
      </Router>
   
  );
}

export default App;
