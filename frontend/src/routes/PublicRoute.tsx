import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";

const PublicRoute = () => {
    const { accessToken, user } = useAppSelector((state) => state.auth);

    if (accessToken) {
        if (user?.role?.toLowerCase() === "admin") {
            return <Navigate to="/admin/dashboard" replace />;
        }
        return <Navigate to="/user/Dashboard" replace />;
    }

    return <Outlet />;
};

export default PublicRoute;
