import React from "react";
import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    CheckSquare,
    Users,
    LogOut,
    X
} from "lucide-react";

interface AdminSidebarProps {
    onLogout: () => void;
    isOpen?: boolean;
    onClose?: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
    onLogout,
    isOpen,
    onClose
}) => {
    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
        { id: "tasks", label: "Tasks", icon: CheckSquare, path: "/admin/tasks" },
        { id: "users", label: "Users", icon: Users, path: "/admin/users" },
    ];

    return (
        <>
            {/* Backdrop for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-300"
                    onClick={onClose}
                />
            )}

            <aside className={`
                fixed inset-y-0 left-0 w-72 bg-white border-r border-slate-100 shadow-xl flex flex-col z-50 transition-transform duration-300 ease-in-out
                md:relative md:translate-x-0
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
            `}>
                <div className="p-8 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-black text-indigo-600 tracking-tight">AdminPanel</h2>
                        <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-[0.2em] font-black">Management Console</p>
                    </div>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 md:hidden"
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.id}
                                to={item.path}
                                className={({ isActive }) => `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? "bg-indigo-50 text-indigo-600 shadow-sm"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <Icon
                                            size={20}
                                            className={`transition-colors ${isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-900"}`}
                                        />
                                        <span className="font-medium">{item.label}</span>
                                        {isActive && (
                                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600" />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-rose-500 hover:bg-rose-50 rounded-xl transition-all group font-bold text-sm"
                    >
                        <LogOut size={20} className="group-hover:scale-110 transition-transform" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;
