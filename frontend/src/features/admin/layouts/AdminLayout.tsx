import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux";
import { logout } from "../../auth/authSlice";
import AdminSidebar from "../components/AdminSidebar";
import { Menu } from "lucide-react";
import type { Task, User, AdminContextType } from "../types";
import { getAllTasks, getAllUsers as fetchUsers } from "../api";
import { connectSocket, disconnectSocket } from "../../../socket/socket";

const AdminLayout: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem("accessToken");
    const [searchQuery, setSearchQuery] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const socket = connectSocket(token!);

        const mapTask = (t: any) => ({
            ...t,
            id: t._id,
            dueDate: t.overDue,
            assignee: typeof t.assignee === 'string'
                ? (users.find(u => u.id === t.assignee)?.name || "Unassigned")
                : (t.assignee?.name || "Unassigned")
        });

        socket.on("work:created", (work: any) => {
            setTasks(prev => [mapTask(work), ...prev]);
        });

        socket.on("work:updated", (work: any) => {
            setTasks(prev => prev.map(t => t.id === work._id ? mapTask(work) : t));
        });

        socket.on("work:deleted", (taskId: string) => {
            setTasks(prev => prev.filter(t => t.id !== taskId));
        });

        return () => {
            socket.off("work:created");
            socket.off("work:updated");
            socket.off("work:deleted");
        };
    }, [token, users]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [tasksData, usersData] = await Promise.all([
                    getAllTasks(),
                    fetchUsers()
                ]);

                const mappedTasks = (tasksData || []).map((t: any) => ({
                    ...t,
                    id: t._id,
                    dueDate: t.overDue,
                    assignee: t.assignee?.name || "Unassigned"
                }));

                const mappedUsers = (usersData || []).map((u: any) => ({
                    id: u._id,
                    name: u.name,
                    role: u.workRole || u.role || "No Role" // Show workRole if available
                }));

                setTasks(mappedTasks);
                setUsers(mappedUsers);
            } catch (error) {
                console.error("Failed to fetch admin data:", error);
            }
        };

        loadData();
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        disconnectSocket();
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
