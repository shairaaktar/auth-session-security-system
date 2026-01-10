import jwt from "jsonwebtoken"
import crypto from "crypto"


export const generateAccessToken=(payload)=>{
    jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:"15m"
    })
}

export const generateRefrestToken=()=>{
    crypto.randomBytes(64).toString("hex");
}
