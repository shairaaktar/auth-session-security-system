import dotenv from "dotenv"
dotenv.config();


const requiredEnv=[
    "PORT",
    "MONGO_URI",
    "JWT_ACCESS_SECRET",
    "JWT_REFRESH_SECRET",
    "NODE_ENV"
];

requiredEnv.forEach((key)=>{
    if(!process.env[key]){
        throw new Error (`Missing enviroment variable:${key}`);
    }
});

export const env={
    port:process.env.PORT,
    mongoUri:process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  nodeEnv: process.env.NODE_ENV

}