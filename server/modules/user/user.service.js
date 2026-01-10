import User from "../../models/User.js";

export const getProfile=async ({userId})=>{
    // console.log("userID",userId)
    return User.findById(userId).select("-password");
}