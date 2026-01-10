import bcrypt from "bcrypt";
import crypto from "crypto";


import User from "../models/User.js"
import RefreshToken from "../models/RefreshToken.js";
import AuditLog from "../models/AuditLog.js"


import { generateAccessToken,generateRefrestToken } from "../utils/token.js";
import { hashToken,compareToken } from "../utils/hash.js";

import {
    accessTokenCookie,
    refreshTokenCookie
} from "../config/cookies.js"