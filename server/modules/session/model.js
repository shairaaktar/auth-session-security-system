
import mongoose from "mongoose";

const sessionSchema=new mongoose.Schema({
    userId:mongoose.Schema.Types.ObjectId,
    refreshTokenId:mongoose.Schema.Types.ObjectId,

    ip:String,
    userAgent:String,
    locked:{
        type:Boolean,
        default:false

    },
    createdAt:{type:Date,default:Date.now},
    lastActiveAt:{type:Date,default:Date.now},
    revoked:{type:Boolean,default:false}

});

export default mongoose.model("Session",sessionSchema)