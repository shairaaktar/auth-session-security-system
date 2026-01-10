const rolePermissions={
    admin: [
    "VIEW_USERS",
    "REVOKE_SESSION",
    "VIEW_AUDIT_LOGS",
    "lOCK_USER"
  ],
  user: [],
}

export const can=(permission)=>{


    return(req,res,next)=>{
        console.log("req",req.user)
        const role=req.user?.role;

         if (!role) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const permissions = rolePermissions[role] || [];

        if(!permissions.includes(permission)){
            return res.status(403).json({error:"Forbidden"});

        }
        next();
    }
}