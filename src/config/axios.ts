import axios from "axios";

import { TOKEN_KEY } from "@/store/authContext";
import Routes from "@/utils/routes";

const instance = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? process.env.HOST_NAME : "http://localhost:4000",
});

let _token: string | null | undefined;

const getToken = () => {
  if (!_token) {
    _token = localStorage.getItem(TOKEN_KEY);
  }
  return _token;
};

instance.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.common["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// Handle authentication errors
instance.interceptors.response.use(
  (res) => res,
  (err) => {
    // Allow 401's from these URLs
    const whitelist = ["/api/login", "/api/register", "/api/password_reset"];

    if (!whitelist.includes(err?.response?.config?.url)) {
      if (err?.response?.status === 401) {
        localStorage.removeItem(TOKEN_KEY);
        window.location.href = `/#${Routes.auth}`;
        return;
      }
    }

    if (err?.response?.status === 429) {
      window.location.href = `/#${Routes.rateLimit}`;
    }

    return Promise.reject(err);
  }
);

export default instance;
