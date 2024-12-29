import { createBrowserRouter } from "react-router-dom";
import PublicRoute from "../layouts/PublicRoute";
import { PATH } from "./path";
import PrivateRoute from "../layouts/PrivateRoute";
import { CalendarPage } from "../pages/Calendar";
import TaskList from "../pages/Task";
import Register from "../pages/Register";
import Home from '../pages/home'
import IFeaturePage from "../pages/FeaturePage";
import GoogleCallback from "../component/GoogleCallback";
import Pomodoro from "../pages/Pomodoro/Pomodoro";

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
        path: "/",
        Component: PrivateRoute,
        children: [
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
                path: PATH.IFEATUREPAGE,
                Component: IFeaturePage,
            },
        ],
    },
]);

export default router;
