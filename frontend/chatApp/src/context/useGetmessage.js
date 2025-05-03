import React, { useEffect, useState } from 'react'
import useConversation from '../../state_management/useConversation.js';
import axios from 'axios';

function useGetmessage() {
    const [loading , setLoading] = useState(true);
    const {messages,setMessages,selectedConversation } = useConversation();

    useEffect(()=>{
        const getMessages = async () => {
            setLoading(true)
            if(selectedConversation && selectedConversation._id){
                try {
                    if(!selectedConversation){
                        console.log("no user");
                        return;
                    }
                    console.log("selectedConversation._id:", selectedConversation._id);
                    const response = await axios.get(`/api/message/msg/${selectedConversation._id}`)
                    setMessages(response.data.messages)
                    setLoading(false)
                } catch (error) {
                    console.log("error in useGetmessage", error);
                }
            }
        }
        getMessages();
    },[ selectedConversation, setMessages])
    return {loading , messages}; 
}

export default useGetmessage

