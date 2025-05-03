import React, { useEffect, useRef, useState } from 'react';
import Message from './Message.jsx';
import { IoMdSend } from "react-icons/io";
import useGetmessage from '../../../context/useGetmessage.js';
import useSendmsg from '../../../context/useSendmsg.js';
import Loading from '../../Loading.jsx';

function Msg() {
    const { sendMessage } = useSendmsg();
    const { loading, messages } = useGetmessage();
    const [message, setMessage] = useState("");
    const lastMsgRef = useRef();

    // Scroll to the last message whenever messages update
    useEffect(() => {
        setTimeout(() => {
            if (lastMsgRef.current) {
                lastMsgRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        try {
            await sendMessage(message);
            setMessage("");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white">
            <div className='flex-1 overflow-auto px-4 py-5 space-y-3'>
                {loading ? (
                    <Loading />
                ) : (
                    messages.length > 0 ? (
                        messages.map((msg, index) => {
                            const isLastMessage = index === messages.length - 1;
                            return (
                                <div key={msg._id} ref={isLastMessage ? lastMsgRef : null}>
                                    <Message message={msg} />
                                </div>
                            );
                        })
                    ) : (
                        <h2 className="text-center text-gray-400">No messages found!</h2>
                    )
                )}
            </div>

            <div className="sticky bottom-0 w-full bg-gray-700 p-2 flex items-center">
                <form onSubmit={handleSubmit} className="flex w-full items-center">
                    <input
                        type="text"
                        placeholder="Type here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-grow h-12 p-3 rounded-lg text-black outline-none"
                    />
                    <button type="submit" className="ml-2 p-3 bg-blue-500 rounded-full hover:bg-blue-600 transition">
                        <IoMdSend className="text-2xl text-white" />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Msg;

