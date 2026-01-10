import app from "./app.js";
import { connctDB } from "./config/db.js";
 import { env } from "./config/env.js";
import dotenv from "dotenv"
dotenv.config();

console.log("CWD:", process.cwd());


const startServer = async () => {
  await connctDB();

  app.listen(env.port, () => {
    console.log(` Server running on port ${env.port}`);
  });
};

startServer();
