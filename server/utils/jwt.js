import jwt from "jsonwebtoken"

import { env } from "../config/env"

export const signAccessToken=(payload,expiresIn)=>{
    return jwt.sign(payload,env.jwtSecret,{expiresIn});
}

export const verifyAccessToken=(token)=>{
    return jwt.verify(token,env.jwtSecret)
}