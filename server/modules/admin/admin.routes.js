


import { Router } from "express";
import * as adminController from "./admin.controller.js";
import { authMiddleware, adminMiddleware } from "../../middleware/auth.js";
import { can } from "../permission/permission.middleware.js";

const router = Router();

router.use(authMiddleware, adminMiddleware);

router.get(
  "/users",
  can("VIEW_USERS"),
  adminController.getUsers
);

router.get(
  "/stats",
  can("VIEW_AUDIT_LOGS"),
  adminController.getSecurityStats
);

router.get(
  "/locked-users",
  can("VIEW_USERS"),
  adminController.getLockedUsers
);

router.get(
  "/sessions",
  can("VIEW_AUDIT_LOGS"),
  adminController.getActiveSessions
);

router.post(
  "/force-logout/:userId",
  can("REVOKE_SESSION"),
  adminController.forceLogout
);

router.post(
  "/unlock-user/:userId",
  can("REVOKE_SESSION"),
  adminController.unlockUser
);

router.get("/audit-logs",
    can("VIEW_AUDIT_LOGS"),
    adminController.getAuditLogs);

router.post(
    "/sessions/:sessionId/lock",
    can("LOCK_USER"),
    adminController.lockSingleSession
)

router.post(
  "/users/:userId/unlock",
 
  can("VIEW_USERS"),
adminController.unlockUsers
);


export default router;

