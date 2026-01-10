import *as userService from "./user.service.js"

export const profile=async(req ,res,next)=>{
    // console.log("req",req.user)
    try{
        const userId=req.user.id;
        const user=await userService.getProfile({userId});
        res.json({
            user:{
                id:req.user.id,
                role:req.user.role
            }
        });
        console.log("user",user)

    }catch(err){
        next(err);

    }
};