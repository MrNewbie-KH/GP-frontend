import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  let token = localStorage.getItem("token");
  if (!token) {
    console.log("user is not logged in");
    return <Navigate to="/login" />;
  }
  return children;
};
export default ProtectedRoute;
