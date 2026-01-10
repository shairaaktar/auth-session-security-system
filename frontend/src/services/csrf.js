import api from "./api";

let csrfToken = null;

export const getCsrfToken = async () => {
  if (!csrfToken) {
    const res = await api.get("/csrf-token");
    csrfToken = res.data.csrfToken;
  }
  return csrfToken;
};
