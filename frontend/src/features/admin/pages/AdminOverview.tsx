import React from "react";
import { useOutletContext } from "react-router-dom";
import {
    Search,
    Clock,
    CheckCircle2,
    ArrowUpRight,
    CheckSquare
} from "lucide-react";
import type { AdminContextType } from "../types";
import { TaskStatus, TaskPriority } from "../types";

const AdminOverview: React.FC = () => {
    const { tasks, searchQuery, setSearchQuery } = useOutletContext<AdminContextType>();

    const getStatusCount = (status: string) => {
        return tasks.filter((task) => task.status === status).length;
    };

    const completionRate = tasks.length > 0
        ? Math.round((getStatusCount(TaskStatus.COMPLETED) / tasks.length) * 100)
        : 0;

    return (
        <div className="max-w-7xl mx-auto px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">Dashboard</h1>
                    <p className="text-slate-500 mt-2 font-medium">Welcome back, Admin</p>
                </div>
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-64 text-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {[
                    { label: "Total Tasks", value: tasks.length, icon: CheckSquare, color: "bg-indigo-50" },
                    { label: "In Progress", value: getStatusCount(TaskStatus.IN_PROGRESS), icon: Clock, color: "bg-blue-50" },
                    { label: "Completed", value: getStatusCount(TaskStatus.COMPLETED), icon: CheckCircle2, color: "bg-emerald-50" },
                    { label: "Efficiency", value: `${completionRate}%`, icon: ArrowUpRight, color: "bg-amber-50" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className="flex items-center gap-4">
                            <div className={`p-2.5 rounded-xl ${stat.color}`}>
                                <stat.icon className="w-5 h-5 text-slate-800" />
                            </div>
                            <span className="text-slate-500 text-sm font-semibold">{stat.label}</span>
                        </div>
                        <div className="text-3xl font-bold text-slate-900 mt-4">{stat.value}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Tasks */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {tasks.slice(0, 4).map((task) => (
                            <div key={task.id} className="p-6 hover:bg-slate-50/50 transition-colors flex items-center justify-between group">
                                <div className="flex items-center gap-4">
                                    <div className={`w-2 h-2 rounded-full ${task.status === TaskStatus.COMPLETED ? 'bg-emerald-500' : task.status === TaskStatus.IN_PROGRESS ? 'bg-blue-500' : 'bg-slate-300'}`} />
                                    <div>
                                        <p className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{task.title}</p>
                                        <p className="text-sm text-slate-500 font-medium">{task.assignee} • Due {new Date(task.dueDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold ${task.priority === TaskPriority.HIGH ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-500'
                                    }`}>
                                    {task.priority}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Performance Ring */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col items-center">
                    <h2 className="text-xl font-bold text-slate-900 mb-8 self-start">Performance</h2>
                    <div className="relative w-40 h-40 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90">
                            <circle cx="80" cy="80" r="70" className="stroke-slate-100" strokeWidth="12" fill="none" />
                            <circle cx="80" cy="80" r="70" className="stroke-indigo-600" strokeWidth="12" fill="none" strokeDasharray="440" strokeDashoffset={440 - (440 * completionRate) / 100} style={{ transition: 'stroke-dashoffset 1.5s ease' }} />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-black text-slate-900">{completionRate}%</span>
                            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Done</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;
