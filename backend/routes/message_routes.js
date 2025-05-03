import express from 'express';
import { getConversation, sendMessage } from '../controllers/message_controller.js';
import  authenticate  from "../middleware/secureUser.js";

const msgRoute = express.Router();

msgRoute.post("/send/:id" ,authenticate, sendMessage);
msgRoute.get("/msg/:id",authenticate, getConversation);

export default msgRoute;