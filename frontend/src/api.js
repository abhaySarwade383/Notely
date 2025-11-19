import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);

        // ❗ Do NOT send token for login or register
        const publicEndpoints = [
            "/api/user/register/",
            "/api/token/",
            "/api/token/refresh/",
        ];

        const isPublic = publicEndpoints.some((url) =>
            config.url.includes(url)
        );

        if (!isPublic && token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
