import React from "react";
// Import React to build the component.

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// BrowserRouter → enables routing in the app
// Routes → wrapper for all routes
// Route → defines each page path
// Navigate → used to redirect from one path to another

import Login from "./pages/Login";
// Login page (public)

import Register from "./pages/Register";
// Register page (public)

import Home from "./pages/Home";
// Protected home page (only logged-in users)

import NotFound from "./pages/NotFound";
// 404 page for invalid routes

import ProtectedRoute from "./components/ProtectedRoute";
// Component that protects routes using JWT auth (token checking)



function Logout() {
  // This component logs the user out

  localStorage.clear();
  // Removes all items from local storage (including tokens)

  return <Navigate to="/login" />;
  // Redirects user to login page after logging out
}



function App() {
  return (
    <BrowserRouter>
      {/* Wraps the entire app with routing capability */}


      <Routes>
        {/* Contains all the route definitions */}



        {/* Redirect root to Register */}
        <Route path="/" element={<Navigate to="/register" />} />
        {/* If someone visits "/", automatically send them to /register */}



        {/* Public routes (no authentication needed) */}
        <Route path="/login" element={<Login />} />
        {/* Shows Login page */}

        <Route path="/register" element={<Register />} />
        {/* Shows Register page */}

        <Route path="/logout" element={<Logout />} />
        {/* Logout route → clears tokens and redirects */}



        {/* Protected Home */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
              {/* Home is wrapped inside ProtectedRoute */}
            </ProtectedRoute>
            // ProtectedRoute checks token validity
            // If valid → show <Home />
            // If invalid → redirect to /login
          }
        />



        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
        {/* If no route matches, show 404 page */}


      </Routes>
    </BrowserRouter>
  );
}

export default App;
// Export the App component so it can be rendered in main.jsx

