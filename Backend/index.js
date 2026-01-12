import express from 'express';
import cors from 'cors'; 
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './Route/user.Route.js';
import { app, server } from './lib/socket.js';
import messageRouter from './Route/message.js';
import cookieParser from 'cookie-parser';
import path from "path";
dotenv.config();    

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URL;
const __dirname=path.resolve();
app.use(cors(
     {
         origin:true,  
        methods:["GET","POST","PUT","DELETE"],
        credentials:true,
    }
));
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({limit:"10mb", extended: true }));

//connect to MongoDB
mongoose.connect(MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}
).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
}
);

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
}
);
app.use('/api/users', userRouter);
 app.use('/api/message', messageRouter);


server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}
);
