import bcrypt from "bcrypt";

export const hashToken=async(token)=>{
    const salt=await bcrypt.genSalt(12);
    return bcrypt.hash(token,salt);
};

export const compareToken=async(token,hash)=>{
    bcrypt.compare(token,hash);
}