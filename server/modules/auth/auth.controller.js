import *as authService from "./auth.service.js"
import { generateCSRFToken } from "../../utils/csrf.js";
import User from "../../models/User.js";
import { log } from "../audit/audit.service.js";
import { registerUser } from "./auth.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const cookieOptions={
    httpOnly:true,
    secure:process.env.NODE_ENV==="production",
    sameSite:"lax"
};

const csrfCookieOptions={
    httpOnly:false,
    secure:process.env.NODE_ENV=="production",
    sameSite:"lax"
}


export const register=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;

    const user=await registerUser({
        email,password,req
    });

    res.status(201).json({
        message:"User registered successfully",
        userId:user._id
    })
})

export const login=async(req,res,next)=>{
    try{

        const {accessToken,refreshToken}=await authService.login(req.body,req);
        console.log("accessToken,refreshToken",accessToken,refreshToken)

        const csrfToken=generateCSRFToken();

        

        res.cookie("accessToken",accessToken,{
            ...cookieOptions,
            maxAge:15*60*1000
        });

        res.cookie("refreshToken",refreshToken,{
            ...cookieOptions,
            maxAge:7*24*60*60*1000
        });

        res.cookie("csrfToken", csrfToken, {
        ...csrfCookieOptions,
        maxAge: 15 * 60 * 1000
        });

        res.status(200).json({message:"Login successful"});


    }catch(err){
        next(err);
    }
};

export const refresh=async(req,res,next)=>{
    try{
        const {accessToken,refreshToken}=await authService.refresh(req);

        const csrfToken=generateCSRFToken()

        res.cookie("csrfToken", csrfToken, {
       ...csrfCookieOptions,
       maxAge: 15 * 60 * 1000
      });

        res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000
    });

    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });


    res.status(200).json({message:"Token refreshed"});


    }catch(err){
        next(err);
    }
}

export const logout=async(req,res,next)=>{
    try{
        await authService.logout(req);

        res.clearCookie("accessToken");
        res.clearCookie("refreshToken")
        res.status(204).end();
        

    }catch(err){
        next(err)
    }
}