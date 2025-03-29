import axios from "axios";
import { logout, refreshToken } from "./reducers/authSlice";

export const api = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,  
});

let isRefreshing = false;
let refreshQueue = [];

api.interceptors.response.use(
    (response) => response, 
    async (error) => {
        const originalRequest = error.config;

        // 🚨 If refresh request itself fails, avoid infinite loop
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            originalRequest.headers = originalRequest.headers || {};

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    refreshQueue.push({ resolve, reject });
                })
                .then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                })
                .catch((err) => Promise.reject(err));
            }

            isRefreshing = true;

            try {
                const store = (await import("./store")).default;
                const res = await store.dispatch(refreshToken()).unwrap();
                const newToken = res.accessToken;

                // ✅ Update all queued requests with new token
                refreshQueue.forEach(({ resolve }) => resolve(newToken));
                refreshQueue = [];

                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                refreshQueue.forEach(({ reject }) => reject(refreshError));
                refreshQueue = [];

                const store = (await import("./store")).default;
                store.dispatch(logout());
                window.location.href = "/login";  
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);
