import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "src/app/services/useAuth";
import { checkAuthorizations } from "../utils/permission";

const ProtectedRoute = ({ children, roles = [] }) => {
  const location = useLocation();
  const { isLoggedIn, user } = useAuth();
  const user_roles = !!user ? user?.roles : [];

  if(!isLoggedIn()) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if(!checkAuthorizations(user_roles, roles)) {
    return <Navigate to="/auth/non-authorise" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;