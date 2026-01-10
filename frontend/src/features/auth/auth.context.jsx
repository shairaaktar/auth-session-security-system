


import { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "./auth.api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    authApi.me()
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (data) => {
    const res = await authApi.login(data);
    setUser(res.data.user);
  };

  const register = async (data) => {
    const res = await authApi.register(data);
    setUser(res.data.user);
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
  };

  const adminUsers = async () => {
 
  const res = await authApi.adminUsers();
  return res;
};


const adminSessions=async()=>{
  const res=await authApi.adminSessions()
  return res
}



const forceLogout=async(userId)=>{
  const res=await authApi.forceLogout(userId);
  return res;

}

const auditLogs=async()=>{
  const res=await authApi.auditLogs();
  console.log("res",res)
  return res
}


  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout,adminUsers,forceLogout,adminSessions,auditLogs }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
