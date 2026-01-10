 import { env } from "../config/env.js";

// import dotenv from "dotenv"
// dotenv.config();

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

 
  console.error(err);

  if (env.nodeEnv === "production") {
    
    if (err.isOperational) {
      return res.status(statusCode).json({
        status: "error",
        message: err.message
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Something went wrong"
    });
  }

 
  return res.status(statusCode).json({
    status: "error",
    message: err.message,
    stack: err.stack
  });
};
