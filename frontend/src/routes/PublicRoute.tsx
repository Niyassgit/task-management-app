import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";

const PublicRoute = () => {
    const { accessToken } = useAppSelector((state) => state.auth);

    if (accessToken) {
        return <Navigate to="/user/Dashboard" replace />;
    }

    return <Outlet />;
};

export default PublicRoute;
