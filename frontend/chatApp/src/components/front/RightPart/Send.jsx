import useSendmsg from '../../../context/useSendmsg';
import React, {useState} from 'react'
import { IoMdSend } from "react-icons/io";

function Send() {
    const {loadings , sendmsg} = useSendmsg();
    const [message , setMessage] = useState("");
    const handleSubmit = async() => {
        e.preventDefault();
        try {
            await sendmsg(message);
            setMessage("");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Type here"
                    value={message}
                    onChange={(e)=> setMessage(e.target.value)}
                    className="input input-neutral w-[90%] h-[8vh]"
                />
                <IoMdSend className='text-5xl cursor-pointer'  />
            </form>
    )
}

export default Send
