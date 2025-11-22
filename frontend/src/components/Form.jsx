import { useState } from "react";
// useState lets us create state variables for username, password, and loading.

import api from "../api";
// 'api' is your Axios instance that sends requests to your Django backend.

import { useNavigate } from "react-router-dom";
// useNavigate allows us to redirect the user to other pages after login/register.

import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
// constants used as keys when saving tokens in localStorage.

import "../styles/Form.css"
// imports the CSS for styling the form.

import LoadingIndicator from "./LoadingIndicator";
// shows spinner while waiting for API response.



function Form({ route, method }) {
// Form is a reusable component.
// It receives props: route (API endpoint) and method ("login" or "register").

    const [username, setUsername] = useState("");
    // State variable for storing the username input.

    const [password, setPassword] = useState("");
    // State variable for storing the password input.

    const [loading, setLoading] = useState(false);
    // Shows/hides loading spinner during API request.

    const navigate = useNavigate();
    // Navigation function to redirect user after success.



    const name = method === "login" ? "Login" : "Register";
    // Determines what text to show on form (title + button).
    // If method = login → "Login", else → "Register".



    const handleSubmit = async (e) => {
    // Function that runs when form is submitted.

        setLoading(true);
        // Start showing loading spinner.

        e.preventDefault();
        // Prevents page from refreshing on form submit.

        try {
            const res = await api.post(route, { username, password })
            // Sends POST request to backend with username + password.
            // 'route' decides whether it's login or register endpoint.

            if (method === "login") {
                // If this form is used for login:

                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                // Stores access token returned by backend.

                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                // Stores refresh token returned by backend.

                navigate("/home")
                // Redirects user to home/dashboard page.
            } else {
                // If method = register:

                navigate("/login")
                // After registering, redirect user to login page.
            }
        } catch (error) {
            alert(error)
            // If API request fails, show error message.
        } finally {
            setLoading(false)
            // Hide loading spinner whether success or error.
        }
    };



    return (
        <form onSubmit={handleSubmit} className="form-container">
        {/* form container styled by CSS.
            When form is submitted, handleSubmit() runs */}


            <h1>{name}</h1>
            {/* Displays Login or Register as title */}



            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            {/* Username input field.
                When typing, update username state. */}



            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            {/* Password input field.
                Updates password state on every key press. */}



            {loading && <LoadingIndicator />}
            {/* If loading is true, show spinner component */}



            <button className="form-button" type="submit">
                {name}
            </button>
            {/* Submit button → text becomes Login or Register */}
        </form>
    );
}

export default Form
// Exports the component so other files can import and use it.
