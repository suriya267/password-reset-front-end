// src/routes/PrivateRoute.tsx

import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../utils/sessionStorage";

const PrivateRoute = ({ children }: any) => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
