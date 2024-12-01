import React from "react";
import { Navigate } from "react-router-dom";

const getTokenFromCookies = () => {
  const name = "authToken=";
  const decodedCookies = decodeURIComponent(document.cookie);
  const cookiesArray = decodedCookies.split(";");
  for (let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!getTokenFromCookies()) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
