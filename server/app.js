// import express from "express"
// import cookieParser from "cookie-parser"
// import cors from "cors"
// import { apiLimiter } from "./middleware/rateLimiter";


// const app=express();

// app.use(express.json())

// app.use(cookieParser())

// app.use("/api",apiLimiter)

// app.use(
//     cors({
//         origin:"http://localhost:3000",
//         credentials:true
//     })
// )

import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";

import { corsOptions } from "./config/cors.js";
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js"
// import adminRoutes from "./modules/admin/admin.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

dotenv.config()
const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin",adminRoutes)
// app.use("/api/admin", adminRoutes);


app.use(errorHandler);

export default app;
