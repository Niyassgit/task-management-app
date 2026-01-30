import type { RouteObject } from "react-router-dom";
import UserDashboard from "../features/user/pages/UserDashboard";

export const userRoutes: RouteObject = {
  path: "user",
  children: [
    {
      path: "Dashboard",
      element:<UserDashboard />
    },
  ],
};
