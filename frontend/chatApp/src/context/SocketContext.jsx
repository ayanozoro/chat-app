import { createContext, useEffect, useState , useContext } from "react";
import {useAuth} from './Auth.jsx';
import io from 'socket.io-client';

const socketContext = createContext();

export const useSocketContext =  ()=>{
    return useContext(socketContext);
}

export const SocketProvider = ({ children }) => {
    const [socket , setSocket] = useState();
    const [authUser] = useAuth()
    const [onlineUser , setOnlineUsers] = useState([]);
    
    useEffect(()=>{
        let socketInstance;
        if(authUser){
            const socket = io('http://localhost:5000',{
                query:{
                    userId:authUser._id
                },
            });
            setSocket(socket);
            socket.on("getOnlineuser", (users)=>{
                setOnlineUsers(users);
            })
            return ()=>socket.close();  // agar user login nahi hai to close kr do 
        }
        return () => {
            if (socketInstance) {
                socketInstance.close();
                setSocket(null);
            }
        };
    }, [authUser]);
    return (
        <socketContext.Provider value={{socket , onlineUser }}>
            {children}
        </socketContext.Provider>
    )
}

export default socketContext;