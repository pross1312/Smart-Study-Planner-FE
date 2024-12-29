import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const authContext = useAuth();
  if (!authContext.isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
