import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { generateToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js';

// signup new user
export const signup=async(req,res)=>{
    const {email,fullName,password,profilePic,bio}=req.body;
    try {
        if(!fullName || !email || !password){
            return res.status(400).json({message:"Please fill all the fields"});
        }

        const user=await User.findOne({email})
        if(user){
            return res.json({message:"User already exists"});
        }

        const salt =await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=await User.create({
            fullName,
            email,
            password:hashedPassword,
            profilePic,
            bio
        })

        const token= generateToken(newUser._id);
        res.json({
            success:true,
            userData:newUser,
            token,
            message:"User created successfully"
        })

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}

// login user

export const login= async(req,res)=>{

    try {
        const { email,password }=req.body;
        if(!email || !password){
            return res.json({message:"Please fill all the fields"});
        }
        const user=await User.findOne({email});
        
        const isPasswordCorrect=await bcrypt.compare(password, user.password);

        if(!user || !isPasswordCorrect){
            return res.json({message:"Invalid credentials"});
        }

        const token= generateToken(user._id);
        res.json({
            success:true,
            userData: user,
            token,
            message:"login successfully"
        })

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}

// controller to check if user is authenticated

export const checkAuth=(req,res)=>{
    res.json({
        success:true,
        user:req.user
    });
}

//controller to update user profile

export const updateProfile= async(req,res)=>{
    try {
        const { profilePic, bio, fullName } = req.body;
        const userId=req.user._id;
        let updatedUser;
        if(!profilePic){
            updatedUser=await User.findByIdAndUpdate(userId,
                {bio, fullName},
                {new:true}
            );
        }
        else{
            const upload = await cloudinary.uploader.upload(profilePic);
            updatedUser= await User.findByIdAndUpdate(userId,
                {profilePic:upload.secure_url,bio,fullName},
                {new:true}
            );
        }
        res.json({
            success:true,
            message:"profile updated successfully",
            updatedUser
        });
    } 
    catch (error) {
        res.json({success:false,message:error.message});
    }
}