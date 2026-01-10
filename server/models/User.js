// import mongoose from "mongoose";


// const userSchema=new mongoose.Schema({
//     email:{type:String,unique:true},
//     password:String,
//     role:String,

//     failedLoginAttempts:{type:Number,default:0},
//     lockUntil:{type:Date,default:null}
// });


// export default mongoose.model("User",userSchema);

import mongoose from "mongoose";
import { baseSchemaFields } from "./base.js";
import { ROLES } from "../constants/roles.js";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: Object.values(ROLES),
    default: ROLES.USER
  },

  
  failedLoginAttempts: {
    type: Number,
    default: 0
  },

  lockUntil: {
    type: Date,
    default: null
  },

  ...baseSchemaFields
});

export default mongoose.model("User", userSchema);
