import React from "react";
import { Navigate } from "react-router-dom";

const UnProtectedRoute = ({ children }) => {
  let token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/" />;
  }
  return children;
};
export default UnProtectedRoute;
