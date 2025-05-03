import jwt from 'jsonwebtoken';

const createToken = (userId , res)=>{
    const token = jwt.sign({userId},process.env.SECRET_KEY,{expiresIn:'7d'});
    console.log("token",token);
    res.cookie("jwt" , token,{
        httpOnly: true ,
        secure: true ,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
}

export default createToken;