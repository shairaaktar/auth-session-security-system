import AuditLog from "./audit.model.js"

export const log=({userId,action,req})=>{
    return AuditLog.create({
        userId,
        action,
        ip:req.ip,
        userAgent:req.headers["user-agent"]
    })
}