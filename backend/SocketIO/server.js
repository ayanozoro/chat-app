import {Server} from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();

const server = http.createServer(app);

const io = new Server(server,{
    cors: {
        origin:"http://localhost:3001",
        methods: ["GET", "POST"]
    }
})

export const getReceiverSocketId = (receiverId)=>{
    return users[receiverId]
}

const users ={}
//used to listen event on server side
io.on("connection", (socket)=>{
    console.log("a new client connected",socket.id);

    const userId = socket.handshake.query.userId
    if(userId){
        users[userId]=socket.id
        console.log(users);
    }

    // used to send events to all connect users
    io.emit("getOnlineuser" , Object.keys(users));

    // used to listen event on client side emmited by server side (use in both sever and clint side)
    socket.on("disconnect",()=>{
        console.log("a client disconnected", socket.id);
        delete users[userId]
        io.emit("getOflineuser" , Object.keys(users));
    })
})

export {app ,io, server}