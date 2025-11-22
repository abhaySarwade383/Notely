import { Navigate } from "react-router-dom";
// Navigate allows us to redirect the user to another route (ex: /login).

import { jwtDecode } from "jwt-decode";
// Used to decode the JWT access token and read its expiration time.

import api from "../api";
// Axios instance for making backend API requests.

import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
// Keys used to get/set tokens in localStorage.

import { useState, useEffect } from "react";
// useState → holds authorization status.
// useEffect → runs auth checks when component loads.



function ProtectedRoute({ children }) {
// ProtectedRoute wraps around any page that requires authentication.
// "children" = the actual protected page (ex: <Home />).



    const [isAuthorized, setIsAuthorized] = useState(null);
    // null → loading state (not yet checked)
    // true → user is allowed to see the protected page
    // false → user is not allowed, redirect to /login



    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
        // When the component loads, run the auth() function.
        // If auth() fails, we set isAuthorized to false.
    }, [])
    // Empty dependency array → runs only once when component mounts.



    const refreshToken = async () => {
    // Function to refresh the access token using the refresh token.

        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        // Get the refresh token stored in localStorage.

        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            // Send POST request to Django endpoint to get a new access token.

            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                // Save the new access token to localStorage.

                setIsAuthorized(true)
                // User is verified → let them access the page.
            } else {
                setIsAuthorized(false)
                // Refresh failed.
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
            // Any error → treat user as unauthorized.
        }
    };



    const auth = async () => {
    // Main function that checks if the current access token is valid.

        const token = localStorage.getItem(ACCESS_TOKEN);
        // Get access token from localStorage.

        if (!token) {
            // If no access token exists → user is not logged in.

            setIsAuthorized(false);
            return;
        }

        const decoded = jwtDecode(token);
        // Decode JWT to read its payload (expiration time etc.)

        const tokenExpiration = decoded.exp;
        // "exp" gives expiration time in UNIX seconds.

        const now = Date.now() / 1000;
        // Current time in UNIX seconds.



        if (tokenExpiration < now) {
            // If the access token is expired:

            await refreshToken();
            // Try to refresh it using the refresh token.

        } else {
            setIsAuthorized(true);
            // Token not expired → user is authorized.
        }
    };



    if (isAuthorized === null) {
        return <div>Loading...</div>;
        // While auth() is still checking, show loading UI.
    }



    return isAuthorized ? children : <Navigate to="/login" />;
    // If authorized → show the protected page.
    // If not authorized → redirect to login page.
}

export default ProtectedRoute;
// Export component so you can wrap protected routes inside App.jsx
