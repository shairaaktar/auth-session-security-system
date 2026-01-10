import axios from "axios";
// import { getCsrfToken } from "./csrf";
// import { config } from "dotenv";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true // 🔐 allow cookies
});

// api.interceptors.request.use(async(config)=>{
//   if(["post","put","delete","patch"].includes(config.method)){
//     const token=await getCsrfToken();
//     config.headers["x-csrf-token"]=token;
//   }
//   return config
// })

api.interceptors.request.use((config) => {
  const csrfToken = document.cookie
    .split("; ")
    .find(row => row.startsWith("csrfToken="))
    ?.split("=")[1];

  if (csrfToken && ["post", "put", "delete", "patch"].includes(config.method)) {
    config.headers["x-csrf-token"] = csrfToken;
  }

  return config;
});


api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url;

    const ignoredRoutes = [
      "/user/me",
      "/auth/login",
      "/auth/register"
    ];

    const shouldIgnore = ignoredRoutes.some((route) =>
      url?.includes(route)
    );

    if (status === 401 && !shouldIgnore) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);



export default api;
