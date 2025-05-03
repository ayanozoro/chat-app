import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {app , server } from './SocketIO/server.js'


import userRoutes from './routes/user_route.js';
import msgRoute from './routes/message_routes.js';
dotenv.config();

const URI = process.env.MONGOOSE_URL;
const PORT = process.env.PORT || 3000;
// const app = express();


//middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

try {
    mongoose.connect(URI)
    .then(console.log("connted to db"));
} catch (err) {
    console.log(err);
}

app.get("/", (req, res) => {
    res.send('Hello World');
});

app.use("/api/user" , userRoutes);
app.use("/api/message", msgRoute);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
