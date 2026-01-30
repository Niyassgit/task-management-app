import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../features/landing/LandingPage";
import { userRoutes } from "../routes/UserRoute";
import LoginPage from "../features/auth/pages/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  { path: "/login", element: <LoginPage /> },
  userRoutes,
]);
