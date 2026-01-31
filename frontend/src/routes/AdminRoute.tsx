import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import AdminLayout from "../features/admin/layouts/AdminLayout";
import AdminOverview from "../features/admin/pages/AdminOverview";
import AdminTasks from "../features/admin/pages/AdminTasks";
import AdminUsers from "../features/admin/pages/AdminUsers";

export const adminRoutes: RouteObject = {
    path: "admin",
    element: <AdminLayout />,
    children: [
        {
            index: true,
            element: <Navigate to="dashboard" replace />
        },
        {
            path: "dashboard",
            element: <AdminOverview />,
        },
        {
            path: "tasks",
            element: <AdminTasks />,
        },
        {
            path: "users",
            element: <AdminUsers />,
        },
    ],
};
