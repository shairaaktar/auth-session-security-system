import User from "../../models/User.js"
import Session from "../session/model.js"
import RefreshToken from "../token/token.model.js"
import AuditLog from "../audit/audit.model.js"


// export const getUsers=async(req,res)=>{
//     const users=await User.find()
//     .select("-password name _id")
//     .sort({createdAt:-1})

//     console.log("user",users)

//     // res.json(users);
//     return{
//         users
//     }
// }


export const getUsers = async () => {
  return User.find()
    .select("-password")
    .sort({ createdAt: -1 });
};


export const getSecurityStats=async()=>{
    const lockedUsers=await User.countDocuments({
        lockedUntil:{$gt:new Date()}
    });

    const activeSessions=await Session.countDocuments({
        revoked:false,locked:false
    });

    const faildLogins=await AuditLog.countDocuments({
        action:"LOGIN_FAILED"
    })

    const revokedSessions=await Session.countDocuments({
        revoked:true
    })

    const lockedSessions=await Session.countDocuments({
        locked:true
    })

    return {
        lockedUsers,
        activeSessions,
        faildLogins,
        revokedSessions,
        lockedSessions
    }
};

export const getLockedUsers=async()=>{
    return User.find({
        lockUntil:{$gt:new Date()}

    }).select("email role lockUntil failedLoginAttempts");
};

export const getActiveSessions=async()=>{
    return Session.find({revoked:false})
    .populate("userId","email")
    .sort({lastActiveAt:-1});
};

export const forceLogout=async(userId)=>{
    console.log("userId",userId)
    await Session.updateMany(
        {userId},
        {revoked:true}
    );

    await RefreshToken.updateMany(
        {userId},
        {revoked:true}
    )
};

export const getAuditLogs=async()=>{
    return AuditLog.find()
    .populate("userId")
    .sort({createdAt:-1})
    .limit(100)
}


export const unlockUser=async(userId)=>{
    await User.updateOne(
        {_id:userId},
        {
            failedLoginAttempts:0,
            lockUntil:null
        }
    )
}

export const lockSession=async(sessionId)=>{
    return Session.findByIdAndUpdate(
        sessionId,
        {locked:true},
        {new:true}

    );

};

export const unlockUsers=async(userId)=>{
    await User.findByIdAndUpdate(userId,{
         lockUntil: null,
    failedLoginAttempts: 0
    });

    await  Session.updateMany(
         { userId },
    { locked: false }

    )

}




