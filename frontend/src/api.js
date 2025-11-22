import axios from "axios";
// Import axios to create an API instance.

import { ACCESS_TOKEN } from "./constants";
// Key name used to get the access token from localStorage.



const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // Create an axios instance with a base URL.
    // This base URL comes from Vite environment variables.
    // Example: http://localhost:8000
});



// ---------------------
// REQUEST INTERCEPTOR
// ---------------------
// This runs BEFORE every API request is sent.
// Used for attaching the JWT access token automatically.

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        // Get stored access token (if any).



        // ❗ These endpoints should NOT receive an Authorization header.
        // Why? Because login/register/token-refresh DO NOT require access token.
        const publicEndpoints = [
            "/api/user/register/",
            "/api/token/",
            "/api/token/refresh/",
        ];



        // Check if the current request URL is one of the public endpoints.
        const isPublic = publicEndpoints.some((url) =>
            config.url.includes(url)
        );
        // isPublic → true/false depending on the URL.



        if (!isPublic && token) {
            // If the endpoint is NOT public AND token exists:

            config.headers.Authorization = `Bearer ${token}`;
            // Attach JWT access token to Authorization header.
            // Now protected endpoints automatically receive the token.
        }



        return config;
        // Always return the config so the request can continue.
    },

    (error) => {
        return Promise.reject(error);
        // If something goes wrong before sending the request → reject it.
    }
);



export default api;
// Export axios instance so other files can import and use it.
