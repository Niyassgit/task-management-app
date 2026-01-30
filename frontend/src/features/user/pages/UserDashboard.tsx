import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { logout } from "../../auth/authSlice";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">TaskApp</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 font-medium">
            Welcome, {user?.name || "User"}!
          </span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors border border-red-200"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">User Dashboard</h2>
          <p className="text-gray-600">
            This is your workspace. Start managing your tasks effectively.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
              <h3 className="font-medium text-indigo-800">My Tasks</h3>
              <p className="text-sm text-indigo-600 mt-1">View and manage your tasks</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
              <h3 className="font-medium text-purple-800">Profile Settings</h3>
              <p className="text-sm text-purple-600 mt-1">Update your personal info</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
