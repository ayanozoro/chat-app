import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authenticate = async (req, res,next) => {
    try{
        const token = req.cookies.jwt;
    if(!token){
        return res.status(401).json({ message: 'no token found' });
    }

    const decoded = jwt.verify(token , process.env.SECRET_KEY);
    if(!decoded){
        return res.status(401).json({ message: 'invalid token' });
    }
    const user = await User.findById(decoded.userId);
    if(!user){
        return res.status(401).json({ message: 'user not found' });
    }
    req.user=user
    next();
    }catch(next){
        res.status(401).json({ message: 'invalid token' });
    }
}

export default authenticate;