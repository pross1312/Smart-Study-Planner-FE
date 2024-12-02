import { debugLog } from "../utils/logger";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useEffect, useState } from "react";

function deleteCookie(name: string): void {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

function getValueFromCookie(name: string): string | null {
  const pairs = document.cookie.split(";");
  for (let i=0; i < pairs.length; i++) {
    const pair = pairs[i].split("=", 2);
    if (pair[0].trim() === name) {
      return pair[1];
    }
  }
  return null;
}

export default function() {
  const authContext = useAuth();
  if (authContext.isAuthenticated()) {
    return (
      <Navigate to="/home" replace />
    );
  } else {
    const token = getValueFromCookie('google-token')
    authContext.setAccessTokenWithoutRerender(token);
    return <Navigate to="/home" replace />;
  }
}
