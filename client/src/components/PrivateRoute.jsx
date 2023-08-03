import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import LoadingSpinner from "./Loading/LoadingSpinner";

const PrivateRoute = () => {
  const {
    authState: { isAuthenticated },
    checking,
  } = useAuthContext();

  if (checking) {
    //checking for authentication.
    return <LoadingSpinner />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
