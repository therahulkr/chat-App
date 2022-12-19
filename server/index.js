const http = require("http")
const express = require("express")
const cors = require("cors")
const socketIO = require("socket.io")

const app = express();
const port = 5000 || process.env.PORT;

app.use(cors());
app.get("/",(req,res)=>{
    res.send("Yes Master its Working");
})

const server = http.createServer(app);

const io = socketIO(server);

const users = [{}];
io.on('connection',(socket)=>{
    console.log("new connection");

    socket.on('joined',({user})=>{
        users[socket.id] = user;
        console.log(`${user} has joined the quick chat`);
        socket.emit('welcome', {user : "Admin", message : `Welcome to the quick chat ${users[socket.id]}`})
        socket.broadcast.emit('userJoined',{user : 'Admin', message : `${users[socket.id]} has joined`})
    })

    socket.on('message', ({message,id}) => {
        io.emit('sendMessage', {user:users[id],message,id} );
    })

    socket.on('left', () => {
        socket.broadcast.emit('leave', {user : "Admin", message : `${users[socket.id]} has left`})
        console.log('user left');
    })
    
})



server.listen(port,()=>{
    console.log(`server is working on http://localhost:${port}`);
})