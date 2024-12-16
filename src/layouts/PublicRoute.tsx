import { useMemo } from "react";
import { Navigate } from "react-router-dom";
import LoginPage from "../pages/login";

const TOKEN = "token";

export default function PublicRoute() {
    const isLoggedIn = useMemo(
        () => !!localStorage.getItem(TOKEN),
        [window && typeof window === "object", localStorage.getItem(TOKEN)]
    );

    return isLoggedIn ? <Navigate to="/" replace /> : <LoginPage />;
}
