import bcrypt from "bcrypt"
import User from "../../models/User.js"
import * as tokenService from "../token/token.service.js"
import * as auditService from "../audit/audit.service.js"
import {MAX_LOGIN_ATTEMPS,LOCK_TIME_MINUTES} from "./auth.constants.js"
import { log } from "../audit/audit.service.js"




export const registerUser=async({email,password,req})=>{
    const existingUser=await User.findOne({email});

    if(existingUser){
        throw new Error("User already exists",409);
    }

    const hashedPassword=await bcrypt.hash(password,12);

    const user=await User.create({
        email,
        password:hashedPassword
    });

    await log({
        userId:user._id,
        action:"REGISTER",
        req
    });

    return user;
}


export const login=async(credentials,req)=>{

    const {email,password}=credentials;

    console.log("email ,password",email,password)

    const user=await User.findOne({email});
    if(!user) throw new Error("Invalid credentials");


    if (user.lockUntil && user.lockUntil>Date.now()){
        throw new Error("Account locked.Try again later.");

    }



    const isValid=await bcrypt.compare(password,user.password);

    


    if(!isValid){
        user.failedLoginAttempts+=1;

        if(user.failedLoginAttempts>=MAX_LOGIN_ATTEMPS){
            user.lockUntil=new Date(
                Date.now()+LOCK_TIME_MINUTES*60*1000
            );

            await auditService.log({
                userId:user._id,
                action:"ACCOUNT_LOCKED",
                req
            });
        }

        await user.save()
        throw new Error("Invalid credentials");


    }

    user.failedLoginAttempts=0;
    user.lockUntil=null;
    await user.save()

    const tokens=await tokenService.generateTokens(user,req);




    // const {accessToken,refreshToken}=
    // await tokenService.generateTokens(user,req);


    await auditService.log({
        userId:user._id,
        action:"LOGIN_SUCCESS",
        req
    });

    return tokens;
};

export const refresh=async(req)=>{
    await tokenService.rotateRefreshToken(req);
}

export const logout=async(req)=>{
    await tokenService.revokeRefreshToken(req)

}