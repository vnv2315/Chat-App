import mongoose from "mongoose";

export const connectDB=async()=>{
    try{
        mongoose.connection.on("connected",()=>{
            console.log("connected to database");
        })
        await mongoose.connect(`${process.env.MONGODB_URL}/chat_app`)
    }
    catch(e){
        console.log(e);
    }
}