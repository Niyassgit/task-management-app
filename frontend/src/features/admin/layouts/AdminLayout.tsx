import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux";
import { logout } from "../../auth/authSlice";
import AdminSidebar from "../components/AdminSidebar";
import { Menu } from "lucide-react";
import type { Task, User, AdminContextType } from "../types";

const AdminLayout: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: "1",
            title: "Design new landing page",
            description: "Create a modern landing page for the core product.",
            assignee: "Sarah Chen",
            status: "in-progress",
            priority: "high",
            dueDate: "2026-02-05",
        },
        {
            id: "2",
            title: "Fix authentication bug",
            description: "Users reporting issues with OAuth login flow.",
            assignee: "Mike Johnson",
            status: "completed",
            priority: "high",
            dueDate: "2026-01-30",
        },
        {
            id: "3",
            title: "Update documentation",
            description: "Add new API endpoints to the dev guide.",
            assignee: "Emma Davis",
            status: "pending",
            priority: "low",
            dueDate: "2026-02-10",
        },
        {
            id: "4",
            title: "API integration",
            description: "Connect the frontend to the new microservice.",
            assignee: "Sarah Chen",
            status: "in-progress",
            priority: "medium",
            dueDate: "2026-02-08",
        },
    ]);

    const users: User[] = [
        { id: "1", name: "Sarah Chen", role: "Frontend Developer" },
        { id: "2", name: "Mike Johnson", role: "Backend Developer" },
        { id: "3", name: "Emma Davis", role: "Designer" },
    ];

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    const contextValue: AdminContextType = {
        tasks,
        setTasks,
        users,
        searchQuery,
        setSearchQuery,
    };

    return (
        <div className="flex bg-[#f8fafc] h-screen overflow-hidden font-sans">
            <AdminSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onLogout={handleLogout}
            />

            <main className="flex-1 overflow-y-auto relative">
                {/* Mobile Header */}
                <header className="md:hidden bg-white border-b border-slate-100 p-4 sticky top-0 z-30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 hover:bg-slate-50 rounded-xl text-slate-600"
                        >
                            <Menu size={24} />
                        </button>
                        <h2 className="text-xl font-black text-indigo-600 tracking-tight">AdminPanel</h2>
                    </div>
                </header>

                <Outlet context={contextValue} />
            </main>
        </div>
    );
};

export default AdminLayout;
