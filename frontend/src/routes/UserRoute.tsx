import type { RouteObject } from "react-router-dom";
import UserDashboard from "../features/user/UserDashboard";

export const userRoutes: RouteObject = {
  path: "user",
  children: [
    {
      path: "Dashboard",
      element:<UserDashboard />
    },
  ],
};
