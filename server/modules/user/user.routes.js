import { Router } from "express";
import {profile} from "./user.controller.js";
import { authMiddleware } from "../../middleware/auth.js";

const router=Router()

router.get("/me",authMiddleware,profile)

export default router;