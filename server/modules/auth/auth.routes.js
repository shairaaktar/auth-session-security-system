import {Router} from "express"
import * as authController from "./auth.controller.js"
import { validateLogin } from "./auth.validator.js"
import { csrfProtection } from "../../middleware/csrf.js";
import { loginLimiter } from "../../middleware/rateLimiter.js";
import { register } from "./auth.controller.js";

const router=Router();

router.post("/login",loginLimiter,validateLogin,authController.login);
router.post("/refresh",csrfProtection,authController.refresh)
router.post("/logout",csrfProtection,authController.logout);
router.post("/register",register)

export default router;


