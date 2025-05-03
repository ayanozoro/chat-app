import React from 'react';
import Chat from './Chat.jsx';
import Msg from './Msg.jsx';
import useConversation from '../../../../state_management/useConversation.js';
import { IoChatbox } from "react-icons/io5";

function Right() {
    const { selectedConversation } = useConversation();

    return (
        <div className=" w-[70%] bg-black text-white border-l border-gray-700 flex flex-col">
            {selectedConversation ? (
                <>
                    <Chat />
                    <div className="flex-1 overflow-auto">
                        <Msg />
                    </div>
                </>
            ) : (
                <NotSelected />
            )}
        </div>
    );
}

export default Right;

const NotSelected = () => {
    const userStr = localStorage.getItem("chatUser");
    const user = userStr ? JSON.parse(userStr) : null;
    
    return (
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
            <IoChatbox className="text-5xl text-red-500" />
            <h1 className="text-2xl font-bold">
                Welcome{' '}
                <span className="text-red-600 font-mono text-3xl">
                    {user ? user.username : "Guest"}
                </span>
            </h1>
            <p className="text-lg text-blue-300">Select a chat to start chatting</p>
        </div>
    );
};
