import { revokeSession } from "../session/service.js"
import * as adminService from "./admin.service.js"


export const getUsers=async(req,res,next)=>{
  try{
    const users=await adminService.getUsers()
    res.json(users)

  }catch(err){
    next(err)
  }
}

export const getSecurityStats=async(req ,res,next)=>{
    try{
        const stats=await adminService.getSecurityStats();
        res.json(stats)

    }catch(err){
        next(err);

    }
}

export const getLockedUsers=async(req,res,next)=>{
    try{
        const users=await adminService.getLockedUsers();
        res.json(users)

    }catch(err){
        next(err);

    }
}

export const getActiveSessions = async (req, res, next) => {
  try {
    const sessions = await adminService.getActiveSessions();
    res.json(sessions);
  } catch (err) {
    next(err);
  }
};


export const forceLogout=async(req,res,next)=>{
    try{
        await adminService.forceLogout(req.params.userId);
    res.status(200).json({ message: "User logged out from all sessions" });

    }catch(err){
        next(err);

    }
}

export const unlockUser = async (req, res, next) => {
  try {
    await adminService.unlockUser(req.params.userId);
    res.status(200).json({ message: "User account unlocked" });
  } catch (err) {
    next(err);
  }
};

export const unlockUsers = async (req, res, next) => {
  try {
    await adminService.unlockUsers(req.params.userId);
    res.status(200).json({ message: "User account unlocked" });
  } catch (err) {
    next(err);
  }
};

export const getAuditLogs=async(req,res,next)=>{
  try{
    const logs=await adminService.getAuditLogs()
    console.log("logs",logs)
    res.json(logs);


  }catch(err){
    next(err);

  }
}

export const lockSingleSession=async(req,res)=>{
  const {sessionId}=req.params;
  await adminService.lockSession(sessionId);
  res.json({message:"Session locked"});
}