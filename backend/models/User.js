import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
    }
}, {timestamps:true})  // timestamps is a option that adds createdAt and updatedAt fields to the schema

const User = mongoose.model('User' ,userSchema);

export default User;