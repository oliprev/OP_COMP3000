import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...rest }) => { 
  const token = localStorage.getItem("token"); // Get token from local storage
  return token ? <Component {...rest} /> : <Navigate to="/login" />; // If token exists, render component, else navigate to login page
}

export default ProtectedRoute;