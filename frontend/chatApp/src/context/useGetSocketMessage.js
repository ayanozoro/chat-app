import React, { useEffect } from 'react'
import { useSocketContext } from './SocketContext'
import useConversation from '../../state_management/useConversation';

function UseGetSocketMessage() {
    const {socket}=useSocketContext();
    const {messages , setMessages}=useConversation()

    useEffect(()=>{
        socket.on('newMessage', (newMessage) => {
            setMessages([...messages ,newMessage])
        })
    } , [socket , messages ,setMessages])
}

export default UseGetSocketMessage
