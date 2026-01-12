import User from '../Modal/user.modal.js';
import { generateToken } from '../lib/utils.js';
import bcrypt from 'bcryptjs';
import cloudinary from '../lib/cloudinary.js';

export const signup = async (req, res) => {
    const { username, email, password } = req.body; 
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }
const user=await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ 
            username,
             email,
             password: hashedPassword });
        await newUser.save();
        generateToken(newUser._id, res)
        res.status(201).json(
            {
                 _id:newUser._id,
    username:newUser.username,
    email:newUser.email,
    profilePicture:newUser.profilePicture,
            }
        );
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }   
};

export const login = async (req, res) => {
const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const user = await User.findOne({ email }); 
        if (!user ) {
            return res.status(401).json({ message: 'Invalid email' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }
    generateToken(user._id, res)
res.status(200).json({
            // message: 'Login successful',
            // user: {
            //     id: user._Id,
            //     email: user.email,
            //     username: user.username
            // }
            _id:user._id,
   username:user.username,
    email:user.email,
    profilePicture:user.profilePicture,
        });

    }catch (error) {
        console.log("error in login controller",error.message);
        
        res.status(500).json({ message: 'Error logging in', error: error.message });    
    }  
};     

export const logout = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true, 
         secure: true,        // 🔥 must for HTTPS
  sameSite: "none", 
        expires: new Date(0) 
    });
    res.status(200).json({ message: 'Logged out successfully' });
};


export const updateProfile=async(req,res)=>{
  try {  const{profilePicture}=req.body;
   const userId= req.user._id;
   if(!profilePicture){
    return res.status(400).json({message:"profile pic are required"});
   }
  const uploadResponse= await cloudinary.uploader.upload(profilePicture)
   const updatedUser=await User.findByIdAndUpdate(userId,{profilePicture:uploadResponse.secure_url},{new:true})
    res.status(200).json(updatedUser)
  } catch (error) {
    console.log("error in update profile",error);
    res.status(500).json({message:"internet server error"});
  }
}

export const checkAuth=(req,res)=>{
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth" , error.message);
    res.status(500).json({message:"internal server error"});
    
  }
}