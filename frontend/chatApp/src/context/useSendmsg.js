import {useState} from "react";
import useConversation from '../../state_management/useConversation.js';
import axios from "axios";
const useSendmsg =()=> {
    // const [setLoadings] = useState(true);
    const { messages, setMessages, selectedConversation } = useConversation();
    const sendMessage = async (message) => {
        // setLoadings(true)
        try {
            const res = await axios.post(`/api/message/send/${selectedConversation._id}` , {message})
            console.log(messages);
            const msg =  res.data.newMessage
            setMessages([...messages, msg])
            // setLoadings(false)
            console.log("Response from server:", res.data.newMessage)
            
        } catch (error) {
            console.log("error in useSendmsg", error);
        }
    }

    return { sendMessage };
}

export default useSendmsg;

