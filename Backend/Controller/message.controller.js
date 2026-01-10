import Message from "../Modal/message.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import cloudinary from "../lib/cloudinary.js";
import User from "../Modal/user.modal.js";

export const getUser= async(req,res)=>{
    try {
         const loggedInUserId=req.user._id;
         const filterUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password");
         res.status(200).json(filterUsers);
    } catch (error) {
        console.error("Error in getUser controller:", error.message);
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};
export const getMessages=async(req,res)=>{
    try {
        const {id:userToChatId}=req.params;
const myId=req.user._id;
        const messages=await Message.find({
            $or:[
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId},
            ],
        })
        res.status(200).json(messages);
    }catch (error) {
        console.error("Error in getMessages controller:", error.message);
         res.status(500).json({ message: 'Error fetching messages', error: error.message });
    }
};
export const sendMessage=async(req,res)=>{
    try {
       const {text,image}=req.body;
       const senderId=req.user._id;
       const {id:receiverId}=req.params;
       let imageUrl;
         if(image){
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
            }
         const newMessage=new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl,
            });
        await newMessage.save();
        //todo real-time using socket.io
        const receiverSocketId=getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }
        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in sendMessage controller:", error.message);
         res.status(500).json({ message: 'Error sending message', error: error.message });
    }
};


