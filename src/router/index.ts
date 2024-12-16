import { createBrowserRouter } from "react-router-dom";
import PublicRoute from "../layouts/PublicRoute";
import { PATH } from "./path";
import PrivateRoute from "../layouts/PrivateRoute";
import { CalendarPage } from "../pages/Calendar";
import TaskList from "../pages/task";
import Register from "../pages/register";
import GoogleCallback from "../component/GoogleCallback";
import home from "../pages/Home";

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
                Component: home,
            },
            {
                path: PATH.CALENDAR,
                Component: CalendarPage,
            },
            {
                path: PATH.TASKS,
                Component: TaskList,
            },
        ],
    },
]);

export default router;
