import mongoose from "mongoose";

const auditSchema=new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  action: String,
  ip: String,
  userAgent: String,
  createdAt: { type: Date, default: Date.now }

})

export default mongoose.model("AuditLog",auditSchema);