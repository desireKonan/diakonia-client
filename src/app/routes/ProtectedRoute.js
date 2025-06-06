import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "src/app/services/useAuth";
import { isIncludeIn } from "src/app/services/utils";

const ProtectedRoute = ({ children, routesAllowed = [] }) => {
  const location = useLocation();
  const { isLoggedIn, user } = useAuth();

  const checkAuthorizations = () => {
    return (routesAllowed && routesAllowed.length !== 0) && isIncludeIn(user.roles, routesAllowed);
  }

  if(!isLoggedIn()) {
    <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if(!checkAuthorizations()) {
      <Navigate to="/auth/non-authorise" state={{ from: location }} replace />;
  }

  return children;
  // return isLoggedIn() ? (
  //   checkAuthorizations() ? (
  //     <>{children}</>
  //   ) : (
  //     <Navigate to="/auth/non-authorise" state={{ from: location }} replace />
  //   )
  // ) : (
  //   <Navigate to="/auth/login" state={{ from: location }} replace />
  // );
};

export default ProtectedRoute;