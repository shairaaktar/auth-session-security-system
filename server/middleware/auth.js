import jwt from "jsonwebtoken"
import { env } from "../config/env.js";
import Session from "../modules/session/model.js"

const JWT_SECRET=process.env.JWT_ACCESS_SECRET;



export const authMiddleware= async(req,res,next)=>{
    
   

    try{

        const token=req.cookies.accessToken;
        if(!token){
            return res.status(401).json({error:"Unauthorizes"});

        }

        const decoded=jwt.verify(token,env.jwtAccessSecret);
        const session=await Session.findById(decoded.sessionId)
       
       if (!session || session.revoked|| session.locked) {
      return res.status(401).json({ error: "Session revoked.Please log in again." });
    }
       req.user={
           id: decoded.userId,
     role: decoded.role,
     sessionId:decoded.sessionId
       }
        next();

        session.lastActiveAt=new Date()
        await session.save()

        next()

    }catch{
       return res.status(401).json({ error: "Invalid or expired token" });
    }
}

export const adminMiddleware=(req,res,next)=>{
    // if(req.user.role!=="admin"){
    //    return res.status(403).json({ error: "Admin access required" });
    // }

    if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
    next();
}