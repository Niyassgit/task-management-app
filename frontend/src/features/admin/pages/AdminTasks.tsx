import React, { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import {
    Search,
    Plus,
    Calendar,
    MoreVertical,
    AlertCircle
} from "lucide-react";
import type { AdminContextType, Task } from "../types";
import { TaskStatus, TaskPriority } from "../types";
import { createTask } from "../api";

const AdminTasks: React.FC = () => {
    const { tasks, setTasks, users, searchQuery, setSearchQuery } = useOutletContext<AdminContextType>();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newTask, setNewTask] = useState<{
        title: string;
        description: string;
        assignee: string;
        priority: TaskPriority;
        dueDate: string;
    }>({
        title: "",
        description: "",
        assignee: "",
        priority: TaskPriority.MEDIUM,
        dueDate: "",
    });

    const filteredTasks = useMemo(() => {
        return tasks.filter(t =>
            t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.assignee.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [tasks, searchQuery]);

    const handleCreateTask = async () => {
        if (newTask.title && newTask.assignee && newTask.dueDate) {
            try {
                const assigneeUser = users.find(u => u.name === newTask.assignee);

                const taskPayload = {
                    title: newTask.title,
                    description: newTask.description,
                    assignee: assigneeUser?.id || "",
                    status: TaskStatus.TO_DO,
                    priority: newTask.priority,
                    overDue: newTask.dueDate, // Backend field name
                };

                const createdTask = await createTask(taskPayload as any);

                // Add the new task to state (with mapping)
                const mappedTask: Task = {
                    ...createdTask,
                    id: createdTask._id,
                    dueDate: createdTask.overDue,
                    assignee: newTask.assignee // Use the name for UI
                };

                setTasks([...tasks, mappedTask]);
                setNewTask({ title: "", description: "", assignee: "", priority: TaskPriority.MEDIUM, dueDate: "" });
                setShowCreateModal(false);
            } catch (error) {
                console.error("Failed to create task:", error);
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">Tasks</h1>
                    <p className="text-slate-500 mt-2 font-medium">Track and manage team performance</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-64 text-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all text-sm flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Create Task
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-slate-50/80 text-slate-500 text-[11px] uppercase tracking-widest font-bold">
                            <th className="px-6 py-4 text-left">Task Name</th>
                            <th className="px-6 py-4 text-left">Assignee</th>
                            <th className="px-6 py-4 text-left">Priority</th>
                            <th className="px-6 py-4 text-left">Due Date</th>
                            <th className="px-6 py-4 text-left">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredTasks.map((task) => (
                            <tr key={task.id} className="hover:bg-slate-50/80 transition-colors group">
                                <td className="px-6 py-4">
                                    <span className="font-bold text-slate-900 block group-hover:text-indigo-600 transition-colors">{task.title}</span>
                                    <span className="text-xs text-slate-400 font-medium">ID: {task.id}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs uppercase">
                                            {task.assignee.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <span className="text-sm font-semibold text-slate-700">{task.assignee}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${task.priority === TaskPriority.HIGH ? 'bg-rose-50 text-rose-600' :
                                        task.priority === TaskPriority.MEDIUM ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-500'
                                        }`}>
                                        {task.priority}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-slate-500 font-semibold text-sm">
                                        <Calendar className="w-4 h-4 opacity-50" />
                                        {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg font-bold text-xs ${task.status === TaskStatus.COMPLETED ? 'text-emerald-600 bg-emerald-50' :
                                        task.status === TaskStatus.IN_PROGRESS ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500 bg-slate-50'
                                        }`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${task.status === TaskStatus.COMPLETED ? 'bg-emerald-600' :
                                            task.status === TaskStatus.IN_PROGRESS ? 'bg-indigo-600' : 'bg-slate-400'
                                            }`} />
                                        {task.status.replace('_', ' ')}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200 shadow-sm opacity-0 group-hover:opacity-100">
                                        <MoreVertical className="w-4 h-4 text-slate-400" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showCreateModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
                    <div className="bg-white rounded-[32px] shadow-2xl max-w-lg w-full p-10 relative animate-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center mb-10">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-indigo-50 rounded-2xl">
                                    <AlertCircle className="w-6 h-6 text-indigo-600" />
                                </div>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Create New Task</h2>
                            </div>
                            <button onClick={() => setShowCreateModal(false)} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-50 transition-colors text-slate-400 text-2xl font-light">×</button>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Title</label>
                                <input
                                    type="text"
                                    placeholder="E.g. Design System 2.0"
                                    className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all font-medium text-slate-900"
                                    value={newTask.title}
                                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Description</label>
                                <textarea
                                    placeholder="Describe the task objective..."
                                    className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all font-medium text-slate-900 min-h-[100px] resize-none"
                                    value={newTask.description}
                                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Priority</label>
                                <div className="flex gap-3">
                                    {Object.values(TaskPriority).map((p) => (
                                        <button
                                            key={p}
                                            onClick={() => setNewTask({ ...newTask, priority: p })}
                                            className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${newTask.priority === p
                                                ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                                                : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                                                }`}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Assignee</label>
                                    <select
                                        className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all font-medium text-slate-900 appearance-none"
                                        value={newTask.assignee}
                                        onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                                    >
                                        <option value="">Select teammate</option>
                                        {users.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Due Date</label>
                                    <input
                                        type="date"
                                        className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all font-medium text-slate-900"
                                        value={newTask.dueDate}
                                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="pt-8">
                                <button
                                    onClick={handleCreateTask}
                                    className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 hover:shadow-indigo-200 hover:-translate-y-1 transition-all"
                                >
                                    Launch Task
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminTasks;
