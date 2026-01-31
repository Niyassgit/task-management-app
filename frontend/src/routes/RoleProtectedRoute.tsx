import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";

interface RoleProtectedRouteProps {
    allowedRoles: string[];
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({ allowedRoles }) => {
    const { accessToken, user } = useAppSelector((state) => state.auth);

    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }

    const userRole = user?.role?.toLowerCase() || "";
    const isAllowed = allowedRoles.some(role => role.toLowerCase() === userRole);

    if (!isAllowed) {
        // Redirect to respective dashboard if they try to access a forbidden route
        if (userRole === "admin") {
            return <Navigate to="/admin/dashboard" replace />;
        }
        return <Navigate to="/user/dashboard" replace />;
    }

    return <Outlet />;
};

export default RoleProtectedRoute;
