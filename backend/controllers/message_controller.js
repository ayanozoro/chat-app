import Message from "../models/messageModel.js";
import Conversation from "../models/conversation.js";
import { getReceiverSocketId } from "../SocketIO/server.js";
import { io } from "../SocketIO/server.js";

export const sendMessage = async(req , res)=>{
    // const senderId = req.user._id; 
    console.log("msg",req.params.id );
    try {
        const msg = req.body.message;
        const senderId = req.user._id;  // current log in user 
        const receiverId = req.params.id;

        const conversation = await Conversation.findOne(
            { members: { $all: [senderId, receiverId] } 
        });
        if (!conversation) {
            conversation = await Conversation.create({ members: [senderId, receiverId] });
        }
        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            message: msg
        })
        await newMessage.save();
        console.log(msg);
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        await conversation.save();

        // Promise.all([newMessage.save(), conversation.save()])
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit('newMessage', newMessage);
        }
        res.status(200).json({newMessage});
    } catch (error) {
        console.log("error in sendmessage", error);
        return res.status(400).json(error);
    }
};


export const getConversation = async (req, res) => {
    try {
        const senderId = req.user._id;  // current log in user
        const {id: chatUser} = req.params;
        // console.log(senderId);
        let conversation = await Conversation.findOne({ members: { $all: [senderId, chatUser]}}).populate("messages");
        if (!conversation) {
            return res.status(404).json({ message: "No conversation found" });
        }
        const messages = conversation.messages;
        console.log(messages);
        return res.status(200).json({messages});
    } catch (error) {
        console.log("err in get Conversation", error);
    }
}