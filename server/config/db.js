import mongoose from "mongoose";
import { env } from "./env.js";


export const connctDB=async()=>{
    try{
        await mongoose.connect(env.mongoUri);
    console.log(" MongoDB connected");

    }catch{
        console.error(" MongoDB connection failed");
    process.exit(1);

    }

}