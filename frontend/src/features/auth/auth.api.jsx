// import api from "../../services/api"

// export const registerUser=(data)=>{
//     api.post("/auth/register",data)
// }

// export const loginUser=(data)=>{
//     api.post("/auth/login",data)
// }

// export const logoutUser=()=>{
//     api.post("/auth/logout");
// }

// export const getMe=()=>{
//     api.get("/auth/me")

import api from "../../services/api";

const csrfToken=document.cookie
.split(";")
.find(row=>row.startsWith("csrfToken="))
?.split("=")[1];

export const authApi = {
 
  login: (data) => api.post("/auth/login", data),
  register: (data) => api.post("/auth/register", data),
   me: () => api.get("/user/me"),
  logout:()=>{
    api.post("/auth/logout",
      {},
      {
        withCredentials:true,
        headers:{
          headers:{
            "X-CSRF-TOKEN":csrfToken,
          }
        }
      }
    )},
  // adminUsers: async()=>{
  //   const res= await api.get("/admin/users",
     
  //     {
  //       withCredentials:true,
      
  //     }
      
  //   )
  //   console.log("res.data",res.data)
  //   return res.data;
  // }
  adminUsers: async () => {
  const res = await api.get("/admin/users");
  return res.data;
},

adminSessions:async()=>{
  const res=await api.get("/admin/sessions");
  return res.data;

},

forceLogout:async(userId)=>{
  const res=await api.post(`/admin/force-logout/${userId}`);
  return res.data;
},

auditLogs:async()=>{
  const res=await api.get("/admin/audit-logs");
  console.log("auditLogs",res)
  return res.data;
}

};
