import { Navigate, useLocation } from "react-router-dom";

import React from "react";

export const AuthRequire = ({ children }) => {
  const token = localStorage.getItem("token");
  let location = useLocation();
  const item = JSON.parse(token);
  const now = new Date();
  if (now.getTime() > item?.expiry) {
    localStorage.removeItem("token");
    return <Navigate to='/login' state={{ from: location }} />;
  }
  if (!token) return <Navigate to='/login' state={{ from: location }} />;
  return children;
};
export const LoginBlock = ({ children }) => {
  const token = localStorage.getItem("token");
  if (token) return <Navigate to='/' />;
  return children;
};
