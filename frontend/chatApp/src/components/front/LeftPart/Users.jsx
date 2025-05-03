import React from 'react'
import useConversation from '../../../../state_management/useConversation.js'
import { useSocketContext } from '../../../context/SocketContext.jsx';

function Users({ user }) {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const isSelected = selectedConversation?._id === user._id;
    const {socket , onlineUser} = useSocketContext();
    const isOnline = onlineUser.includes(user._id);
    console.log("isonline",isOnline);
    return (
        <div className={`hover:bg-blue-300 ${isSelected?"bg-blue-400":""}`} onClick={()=>{setSelectedConversation(user)}}>
            <div className='flex space-x-4 duration-300 cursor-pointer rounded-lg'>
                <div className={`avatar ${isOnline? "avatar-online":"avatar-offline"} py-4 px-2`}>
                    <div className="ring-primary ring-offset-base-100 w-13 rounded-full ring ring-offset-2">
                        <img src="https://th.bing.com/th/id/OIP.yxqRw9Nq9fMHEnf9kHQ9nAHaHu?rs=1&pid=ImgDetMain" />
                    </div>
                </div>
                <div className='py-5'>
                    <h2 className="text-white-600 font-bold ">{user.username}</h2>
                    <span className="text-gray-600 ">{isOnline?"online" : "offline"}</span>
                </div>
            </div>
        </div>
    )
}

export default Users
