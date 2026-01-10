import mongoose from "mongoose";

const tokenSchema=new mongoose.Schema({
    userId:mongoose.Schema.Types.ObjectId,
    tokenHash:String,
    expiresAt:Date,
    revoked:{type:Boolean,default:false}
});

export default mongoose.model("RefreshToken",tokenSchema);

