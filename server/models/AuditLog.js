import mongoose from "mongoose";
import { baseSchemaFields } from "./base";

const auditLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false
  },

  action: {
    type: String,
    required: true
  },

  ip: {
    type: String
  },

  userAgent: {
    type: String
  },

  ...baseSchemaFields
});

export default mongoose.model("AuditLog", auditLogSchema);
