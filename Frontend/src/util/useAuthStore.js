import {create} from "zustand";
import API from "./api";
import toast from "react-hot-toast";
import {io} from "socket.io-client";
const BASE_URL="https://chat-app-pif3.onrender.com";
 export const useAuthStore=create((set,get)=>({
    authUser:null,
    isSignup:false,
    isloggingIng:false,
     isUpdatingProfile:false,
    isCheckingAuth:true,
      onlineUsers:[],
    socket:null,
checkAuth:async()=>{
try {
    const res=await API.get("/users/check");
    set({authUser:res.data});
    get().connectSocket();
} catch (error) {
     console.log("error in checkAuth",error)
           set({authUser:null}) 
}finally{
    set({isCheckingAuth:false});
}
},
signup:async(data)=>{
    set({isSignup:true});
    try {
        const res=await API.post("/users/signup",data);
        set({authUser:res.data});
        toast.success("Account created successfully");
        get().connectSocket();
    } catch (error) {
        const message =
    error.response?.data?.message || "Something went wrong";
  toast.error(message);
    }finally{
        set({isSignup:false});
    }
},
login:async(data)=>{
    set({isloggingIng:true});
    try {
        const res=await API.post("/users/login",data);
        set({authUser:res.data});
        toast.success("logged in successfully ");
        get().connectSocket();
    } catch (error) {
        const message =
    error.response?.data?.message || "Something went wrong";
  toast.error(message);
    }finally{
        set({isloggingIng:false});
    }
},
logout:async()=>{{
    try {
        await API.post("/users/logout");
        set({authUser:null});
        toast.success("logged out successfully");
        get().disconnectSocket();
    } catch (error) {
        
    }
}},



   updateProfile:async(data)=>{
        set({isUpdatingProfile:true});
        try {   
            const res=await API.put("/users/update-profile",data);
            set({authUser:res.data});
            toast.success("Profile updated successfully");
            return res.data;
        } catch (error) {
            console.log("error in update profile",error);  
            toast.error("Error updating profile",error.response.data.message);
        }finally{
            set({isUpdatingProfile:false});
        
    }
},

    connectSocket:()=>{
        const{authUser}=get();
        if(!authUser || get().socket?.connected) return;
        const socket=io(BASE_URL,{
            query:{userId:authUser._id}
        })
        socket.connect();
        set({socket:socket});
        socket.on("getOnlineUsers",(userIds)=>{
            set({onlineUsers:userIds});
        });
    },
    disconnectSocket:()=>{
        if(get().socket?.connected)
            get().socket.disconnect();
        
    },

 }))