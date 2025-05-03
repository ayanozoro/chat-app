import React from 'react'

function Message({message}) {
    const currUser = JSON.parse(localStorage.getItem("chatUser"));
    const isUser = message.senderId === currUser._id;
    const chatName = isUser? "chat-end" : "chat-start";
    const createdAt = new Date(message.createdAt)
    const time = createdAt.toLocaleTimeString([],{
        hour:'2-digit',
        minute:'2-digit'
    })
    return (
        <>
          <div className={`chat ${chatName}`}>
                <div className="chat-bubble ">
                    {message.message}
                </div>
                <div className="chat-footer">{time}</div>
            </div>
            
        </>
    )
}

export default Message
