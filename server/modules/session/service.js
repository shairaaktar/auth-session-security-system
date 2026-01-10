// import { refresh } from "../auth/auth.service"
import Session from "./model.js"

export const createSession=async({
    userId,
    refreshTokenId,
    req
})=>{
    return Session.create({
        userId,
        refreshTokenId,
        ip:req.ip,
        userAgent:req.headers["user-agent"]
    })
};


export const updateLastActive=async(refreshTokenId)=>{
    return Session.updateOn(
        {refreshTokenId},
        {lastActiveAt:new Date()}
    )
}

export const revokeSession=async (refreshTokenId)=>{
    return Session.updateOne(
       { refreshTokenId},
       {revoked:true}

    )

}