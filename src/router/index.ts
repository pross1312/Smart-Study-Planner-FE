import { createBrowserRouter } from "react-router-dom";
import PublicRoute from "../layouts/PublicRoute";
import { PATH } from "./path";
import PrivateRoute from "../layouts/PrivateRoute";
import { CalendarPage } from "../pages/Calendar";
import TaskList from "../pages/task";
import Register from "../pages/register";
import UserInfo from "../pages/Profile";
import Home from "../pages/home";
import IFeaturePage from "../pages/FeaturePage";
import GoogleCallback from "../component/GoogleCallback";
import Pomodoro from "../pages/Pomodoro/Pomodoro";
import ForgotPassword from "../pages/ForgotPassword";
import VideoRoom from "../pages/VideoRoom";

const router = createBrowserRouter([
    {
        path: PATH.LOGIN,
        Component: PublicRoute,
    },
    {
        path: PATH.REGISTER,
        Component: Register,
    },
    {
        path: PATH.GOOGLE_CALL_BACK,
        Component: GoogleCallback,
    },
    {
        path: PATH.FORGOT_PASSWORD,
        Component: ForgotPassword,
    },
    {
        path: PATH.RESET_PASSWORD,
        Component: ForgotPassword,
    },
    {
        path: "/",
        Component: PrivateRoute,
        children: [
            {
                path: "",
                Component: Home,
            },
            {
                path: PATH.HOME,
                Component: Home,
            },
            {
                path: PATH.CALENDAR,
                Component: CalendarPage,
            },
            {
                path: PATH.TASKS,
                Component: TaskList,
            },
            {
                path: PATH.POMODORO,
                Component: Pomodoro,
            },
            {
                path: PATH.FOCUS_ROOM,
                Component: VideoRoom,
            },
            {
                path: PATH.PROFILE,
                Component: UserInfo,
                children: [
                    {
                        path: ":userId",
                        Component: UserInfo,
                    },
                ],
            },
            {
                path: PATH.IFEATUREPAGE,
                Component: IFeaturePage,
            },
        ],
    },
]);

export default router;
