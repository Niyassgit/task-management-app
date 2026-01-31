import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../features/landing/LandingPage";
import { userRoutes } from "../routes/UserRoute";
import { adminRoutes } from "../routes/AdminRoute";
import LoginPage from "../features/auth/pages/LoginPage";
import SignupPage from "../features/auth/pages/SignupPage";
import ProtectedRoute from "../routes/ProtectedRoute";
import PublicRoute from "../routes/PublicRoute";

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [userRoutes, adminRoutes],
  },
]);
