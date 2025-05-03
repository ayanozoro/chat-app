import React from 'react'
import useConversation from '../../../../state_management/useConversation.js'
import { useSocketContext } from '../../../context/SocketContext.jsx';

function Chat() {
    const {selectedConversation} = useConversation();
    const user = selectedConversation?selectedConversation.username : "vv";
    const {onlineUser} = useSocketContext();
    const isOnline = onlineUser.includes(user._id);
    const getOnlineUser = (userId)=>{
        return onlineUser.includes(userId)?"online":"offline"
    }
    return (
        <div className='sticky top-0 w-[100%]'>
            <div className="chat flex bg-gray-600">
            <div className="chat-header">
            <div className={`avatar ${onlineUser.includes(selectedConversation._id)?"avatar-online" :"avatar-offline"} pl-4`}>
  <div className="w-15 rounded-full">
    <img src="https://www.nicepng.com/png/detail/804-8049853_med-boukrima-specialist-webmaster-php-e-commerce-web.png" />
  </div>
</div>
            </div>
            <div className="">
                <h2>{user}</h2>
                <span>{getOnlineUser(selectedConversation._id)}</span>
            </div>
        </div>
        </div>
    )
}

export default Chat
