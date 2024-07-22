import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "./Store/hooks";

const ProtectedRoute: React.FC<{ redirectPath?: string }> = ({
  redirectPath = "/",
}) => {
  const user = useAppSelector((state) => state.auth.user); // Adjust to match your state slice

  // Redirect to login if user is not authenticated
  if (!user) {
    return <Navigate to={redirectPath} />;
  }

  // Render child routes if authenticated
  return <Outlet />;
};

export default ProtectedRoute;
