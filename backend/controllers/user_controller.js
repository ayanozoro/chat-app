import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import createToken from '../tokken/jwtTokken.js'

export const signup = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;
        
        if (password != confirmPassword) {
            return res.status(400).json("password is not matching");
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json("user already exist");
        }

        const newUser = await new User({
            username: username,
            email: email,
            password: hashPassword,
        })
        await newUser.save();
        if (newUser) {
            createToken(newUser._id, res);
            res.status(200).json({meessage:"user has been created" , newUser:{
                username: newUser.username,
                email: newUser.email,
                _id: newUser._id
            }});
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json("something went wrong");
    }
}


export const login = async (req, res) => {

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json("user not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json("password is not matching");
        }
        createToken(user._id, res);

        res.status(200).json({
            message: "User logged in successfully ✅",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json("something went wrong");
    }
}


export const logout = async (req , res)=>{
    try{
        res.clearCookie("jwt");
        // localStorage.removeItem('chatUser');
        return res.status(200).json("user logged out");
    }catch(err){
        console.log(err);
        return res.status(500).json("something went wrong");
    }
}


export const allUser = async(req ,res)=>{
    try{
        const logInuser = req.user._id;
        const user = await User.find({_id:{$ne:logInuser}}).select("-password");
        return res.status(200).json(user);
    }catch(err){
        console.log(err);
    }
}

