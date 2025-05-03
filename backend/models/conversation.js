import mongoose from "mongoose";

const conversationSchema = mongoose.Schema({
    members:[
        {
            type:mongoose.Types.ObjectId,
            ref:"User"
        }
    ],
    messages:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Message",
            default:[]
        }
    ]
},{timestamp:true})

const Conversation = mongoose.model("Conversation",conversationSchema);
export default Conversation;