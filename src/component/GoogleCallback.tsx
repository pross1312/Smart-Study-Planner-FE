import { Navigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

export default function() {

  const authContext = useAuth();
  if (authContext.isAuthenticated()) {
    return (
      <Navigate to="/home" replace />
    );
  } else {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (!token) {
      console.log("Server didn't send any token");
      return <Navigate to="/login" replace />;
    } else {
      authContext.setAccessTokenWithoutRerender(token);
      return <Navigate to="/home" replace />;
    }
  }
}
