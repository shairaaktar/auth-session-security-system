import api from "./api";

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.log("Session expired");
      localStorage.removeItem("accessToken")
      window.location.href="/login";
    }
    return Promise.reject(err);
  }
);
