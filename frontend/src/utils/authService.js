import httpClient from "./httpClient";

const authService = {
  register: (payload) => httpClient.post("/api/auth/register", payload),
  login: (payload) => httpClient.post("/api/auth/login", payload),
};

export default authService;
