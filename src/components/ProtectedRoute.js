import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("currentUser");
  if (!token || !user) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

export default ProtectedRoute;
