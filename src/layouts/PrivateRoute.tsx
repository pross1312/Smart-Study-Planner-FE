import { useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { PATH } from "../router/path";
import { useAuth } from "../store/AuthContext";
import MainLayout from "./MainLayout";

const GuestRoute = [PATH.POMODORO];

export default function PrivateRoute() {
    const location = useLocation();
    const { isAuthenticated } = useAuth();
    const isLoggedIn = isAuthenticated();

    const isLogged = useMemo(() => {
        return isAuthenticated();
    }, [isLoggedIn]);

    const isGuestRoute = GuestRoute.includes(location.pathname);

    if (isGuestRoute) {
        return <MainLayout />;
    }

    return isLogged === undefined ? (
        <CircularProgress color="inherit" size="30px" />
    ) : isLogged ? (
        <MainLayout />
    ) : (
        <Navigate to={PATH.LOGIN} state={{ from: location }} replace />
    );
}
