import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import TaskManagementDashboard from "../pages/TaskManagementDashboard/TaskManagementDashboard";
import ContactUs from "../pages/ContactUs/ContactUs";
import Profile from "../pages/Profile/Profile";
import PrivateRoute from "./PrivateRoute";
import TaskDemo from "../pages/TaskManagementDashboard/TaskDemo";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/taskDemo",
                element: <TaskDemo />,
            },
            {
                path: "/taskManagementDashboard",
                element: (
                    <PrivateRoute>
                        <TaskManagementDashboard />
                    </PrivateRoute>
                ),
            },
            {
                path: "/contactUs",
                element: <ContactUs />,
            },
            {
                path: "/profile",
                element: (
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                ),
            },
        ],
    },
]);
