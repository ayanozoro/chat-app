// import mongoose from "mongoose";
import express from "express";
import { signup, login ,logout, allUser} from "../controllers/user_controller.js";
import  authenticate  from "../middleware/secureUser.js";

const userRoutes = express.Router();

userRoutes.post('/signup' , signup);
userRoutes.post('/login' , login);
userRoutes.post('/logout' , logout);
userRoutes.get('/alluser',authenticate, allUser);

export default userRoutes;