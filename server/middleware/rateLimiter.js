import rateLimit from "express-rate-limit";

export const loginLimiter=rateLimit({
    windowMs:15*60*1000,
    max:5,
    message:{
        error:"Too many login attempts. Try again later."

    },
    standardHeaders:true,
    legacyHeaders:false,
});

export const authLimiter=rateLimit({
    windowMs: 15 * 60 * 1000,
  max: 20, 
  message: "Too many auth attempts. Try again later.",

})


export const apiLimiter=rateLimit({
    windowMs:1*60*1000,
    max:100,
    message:{
        error:"Too many requests"
    }

});