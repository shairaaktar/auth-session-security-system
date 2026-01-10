import crypto, { hash } from "crypto"
import RefreshToken from "./token.model.js"
import jwt from "jsonwebtoken"
import * as sessionService from "../session/service.js"

import {ACCESS_TOKEN_EXPIRY} from "../auth/auth.constants.js"
import { env } from "process"

 const JWT_SECRET=process.env.JWT_ACCESS_SECRET

 console.log("JWT_SECRET",JWT_SECRET)

 console.log("JWT_ACCESS_SECRET:", process.env.JWT_ACCESS_SECRET);
console.log("JWT_REFRESH_SECRET:", process.env.JWT_REFRESH_SECRET);



const hashToken=(token)=>{
    crypto.createHash("sha256").update(token).digest("hex");
}

export const generateTokens=async(user,req)=>{
     
    if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
    throw new Error("JWT secrets are not defined");
  }

    const refreshTokenDoc=await RefreshToken.create({
        userId:user._id,
        // tokenHash:refreshTokenHash,
        // expiresAt
    });

   const session= await sessionService.createSession({
        userId:user._id,
        refreshTokenId:refreshTokenDoc._id,
        req
    });

    const accessToken=jwt.sign(
        {
            userId:user._id,
            role:user.role,
            sessionId:session._id
            
        },
       env.JWT_ACCESS_SECRET,
       
       
        {expiresIn:ACCESS_TOKEN_EXPIRY}
    )

    const refreshToken=crypto.randomBytes(64).toString("hex");
    const refreshTokenHash=hashToken(refreshToken);

    await RefreshToken.create({
        userId:user._id,
        tokenHash:refreshTokenHash,
        expiresAt:new Date(Date.now()+7*24*60*60*1000)
    })
    return{
        accessToken,
        refreshToken
    };

};

export const rotateRefreshToken=async(req)=>{

    
    const refreshToken=req.cookies?.refreshToken;
    if(!refreshToken) throw new Error("Refresh token missing");

    const refreshTokenHash=hashToken(refreshToken);

    const storedToken=await RefreshToken.findone({
        tokenHash:refreshToken,
        revoked:false
    });

    if(!storedToken){
        throw new Error("Refresh token reuse detected");
    }

    await sessionService.updateLastActive(storedToken._id);

    storedToken.revoked=true;
    await storedToken.save();

    const user={_id:storedToken.userId};
    return generateTokens(user,req);

    

}
// export const revokeRefreshToken=async(req)=>{

//     const refreshToken=req.cookies?.refreshToken;

//     if(!refreshToken) return;

//     const refreshTokenHash=hashToken(refreshToken);
    

//     await RefreshToken.updateOne(
//         {tokenHash:refreshTokenHash},
//         {revoked:true}
//     )

//     await sessionService.revokeSession(storedToken._id);

// }

export const revokeRefreshToken = async (req) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) return;

  const refreshTokenHash = hashToken(refreshToken);

  
  const storedToken = await RefreshToken.findOne({
    tokenHash: refreshTokenHash,
    revoked: false
  });

  if (!storedToken) return;

  storedToken.revoked = true;
  await storedToken.save();

 
  if (storedToken.sessionId) {
    await sessionService.revokeSession(storedToken.sessionId);
  }
};


