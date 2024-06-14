import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "src/app/services/useAuth";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  
  return isLoggedIn() ? (
    <>{children}</>
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;