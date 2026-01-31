import React, { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import {
    Search,
    Plus,
    Calendar,
    AlertCircle,
    Pencil,
    Trash2,
    Eye,
} from "lucide-react";
import type { AdminContextType, Task } from "../types";
import { TaskStatus, TaskPriority } from "../types";
import { createTask, updateTask, deleteTask as deleteTaskApi } from "../api";
import { toast } from "react-toastify";

const AdminTasks: React.FC = () => {
    const { tasks, setTasks, users, searchQuery, setSearchQuery } =
        useOutletContext<AdminContextType>();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [viewingTask, setViewingTask] = useState<Task | null>(null);
    const [taskToDelete, setTaskToDelete] = useState<string | null>(null);



    const [newTask, setNewTask] = useState<{
        title: string;
        description: string;
        assignee: string;
        priority: TaskPriority;
        dueDate: string;
        status?: TaskStatus;
    }>({
        title: "",
        description: "",
        assignee: "",
        priority: TaskPriority.MEDIUM,
        dueDate: "",
        status: TaskStatus.TO_DO,
    });

    const [fieldErrors, setFieldErrors] = useState<{
        title?: string;
        assignee?: string;
        dueDate?: string;
    }>({});

    const filteredTasks = useMemo(() => {
        return tasks.filter(
            (t) =>
                t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.assignee.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    }, [tasks, searchQuery]);

    const openEditModal = (task: Task) => {
        setEditingTask(task);
        setNewTask({
            title: task.title,
            description: task.description || "",
            assignee: task.assignee,
            priority: task.priority,
            dueDate: new Date(task.dueDate).toISOString().split("T")[0],
            status: task.status,
        });
        setShowCreateModal(true);
    };

    const handleSaveTask = async () => {
        const errors: typeof fieldErrors = {};
        if (!newTask.title) errors.title = "Title is required";
        if (!newTask.assignee) errors.assignee = "Assignee is required";
        if (!newTask.dueDate) errors.dueDate = "Due date is required";

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        setFieldErrors({});
        try {
            const assigneeUser = users.find((u) => u.name === newTask.assignee);
            const taskPayload = {
                title: newTask.title,
                description: newTask.description,
                assignee: assigneeUser?.id || editingTask?.assignee || "",
                status: newTask.status || TaskStatus.TO_DO,
                priority: newTask.priority,
                overDue: newTask.dueDate,
            };

            if (editingTask) {
                const result = await updateTask(editingTask.id, taskPayload as any);
                const updatedTaskFromApi = result.data;

                setTasks(
                    tasks.map((t) =>
                        t.id === editingTask.id
                            ? {
                                ...t,
                                title: updatedTaskFromApi.title,
                                description: updatedTaskFromApi.description,
                                assignee: newTask.assignee,
                                priority: updatedTaskFromApi.priority,
                                dueDate: updatedTaskFromApi.overDue,
                                status: updatedTaskFromApi.status,
                            }
                            : t,
                    ),
                );

                toast.success("Task updated successfully!");
            } else {
                const createdTask = await createTask(taskPayload as any);
                const mappedTask: Task = {
                    ...createdTask,
                    id: createdTask._id,
                    dueDate: createdTask.overDue,
                    assignee: newTask.assignee,
                };
                setTasks([...tasks, mappedTask]);
                toast.success("Task created successfully!");
            }

            resetForm();
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                `Failed to ${editingTask ? "update" : "create"} task`,
            );
            console.error("Failed to save task:", error);
        }
    };

    const handleDeleteTask = async () => {
        if (!taskToDelete) return;

        try {
            await deleteTaskApi(taskToDelete);
            setTasks(tasks.filter((t) => t.id !== taskToDelete));
            toast.success("Task deleted successfully");
            setTaskToDelete(null);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete task");
        }
    };

    const resetForm = () => {
        setNewTask({
            title: "",
            description: "",
            assignee: "",
            priority: TaskPriority.MEDIUM,
            dueDate: "",
            status: TaskStatus.TO_DO,
        });
        setShowCreateModal(false);
        setEditingTask(null);
        setFieldErrors({});
    };

    return (
        <div className="max-w-7xl mx-auto px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">
                        Tasks
                    </h1>
                    <p className="text-slate-500 mt-2 font-medium">
                        Track and manage team performance
                    </p>
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
                            <th className="px-6 py-4 text-left">ID</th>
                            <th className="px-6 py-4 text-left">Task Title</th>
                            <th className="px-6 py-4 text-left">Assignee</th>
                            <th className="px-6 py-4 text-left">Priority</th>
                            <th className="px-6 py-4 text-left">Due Date</th>
                            <th className="px-6 py-4 text-left">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredTasks.map((task) => (
                            <tr
                                key={task.id}
                                className="hover:bg-slate-50/80 transition-colors group"
                            >
                                <td className="px-6 py-4">
                                    <span className="text-xs text-slate-400 font-medium">
                                        #{task.id.slice(-6).toUpperCase()}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="font-bold text-slate-900 block group-hover:text-indigo-600 transition-colors">
                                        {task.title}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs uppercase">
                                            {task.assignee
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </div>
                                        <span className="text-sm font-semibold text-slate-700">
                                            {task.assignee}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${task.priority === TaskPriority.HIGH
                                            ? "bg-rose-50 text-rose-600"
                                            : task.priority === TaskPriority.MEDIUM
                                                ? "bg-amber-50 text-amber-600"
                                                : "bg-slate-50 text-slate-500"
                                            }`}
                                    >
                                        {task.priority}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-slate-500 font-semibold text-sm">
                                        <Calendar className="w-4 h-4 opacity-50" />
                                        {new Date(task.dueDate).toLocaleDateString(undefined, {
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div
                                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg font-bold text-xs ${task.status === TaskStatus.COMPLETED
                                            ? "text-emerald-600 bg-emerald-50"
                                            : task.status === TaskStatus.IN_PROGRESS
                                                ? "text-indigo-600 bg-indigo-50"
                                                : "text-slate-500 bg-slate-50"
                                            }`}
                                    >
                                        <div
                                            className={`w-1.5 h-1.5 rounded-full ${task.status === TaskStatus.COMPLETED
                                                ? "bg-emerald-600"
                                                : task.status === TaskStatus.IN_PROGRESS
                                                    ? "bg-indigo-600"
                                                    : "bg-slate-400"
                                                }`}
                                        />
                                        {task.status.replace("_", " ")}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => setViewingTask(task)}
                                            className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200 shadow-sm text-slate-400 hover:text-blue-500"
                                            title="View Details"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => openEditModal(task)}
                                            className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200 shadow-sm text-slate-400 hover:text-indigo-600"
                                            title="Edit Task"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setTaskToDelete(task.id)}
                                            className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200 shadow-sm text-slate-400 hover:text-rose-600"
                                            title="Delete Task"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Create/Edit Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
                    <div className="bg-white rounded-[32px] shadow-2xl max-w-lg w-full p-10 relative animate-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center mb-10">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-indigo-50 rounded-2xl">
                                    <AlertCircle className="w-6 h-6 text-indigo-600" />
                                </div>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                                    {editingTask ? "Edit Task" : "Create New Task"}
                                </h2>
                            </div>
                            <button
                                onClick={resetForm}
                                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-50 transition-colors text-slate-400 text-2xl font-light"
                            >
                                ×
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    placeholder="E.g. Design System 2.0"
                                    className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all font-medium text-slate-900"
                                    value={newTask.title}
                                    onChange={(e) =>
                                        setNewTask({ ...newTask, title: e.target.value })
                                    }
                                />
                                {fieldErrors.title && (
                                    <p className="text-red-500 text-xs pl-1 font-bold">
                                        {fieldErrors.title}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
                                    Description
                                </label>
                                <textarea
                                    placeholder="Describe the task objective..."
                                    className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all font-medium text-slate-900 min-h-[100px] resize-none"
                                    value={newTask.description}
                                    onChange={(e) =>
                                        setNewTask({ ...newTask, description: e.target.value })
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
                                    Priority
                                </label>
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
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
                                        Assignee
                                    </label>
                                    <select
                                        className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all font-medium text-slate-900 appearance-none"
                                        value={newTask.assignee}
                                        onChange={(e) =>
                                            setNewTask({ ...newTask, assignee: e.target.value })
                                        }
                                    >
                                        <option value="">Select teammate</option>
                                        {users.map((u) => (
                                            <option key={u.id} value={u.name}>
                                                {u.name}
                                            </option>
                                        ))}
                                    </select>
                                    {fieldErrors.assignee && (
                                        <p className="text-red-500 text-xs pl-1 font-bold">
                                            {fieldErrors.assignee}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
                                        Due Date
                                    </label>
                                    <input
                                        type="date"
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all font-medium text-slate-900"
                                        value={newTask.dueDate}
                                        onChange={(e) =>
                                            setNewTask({ ...newTask, dueDate: e.target.value })
                                        }
                                    />
                                    {fieldErrors.dueDate && (
                                        <p className="text-red-500 text-xs pl-1 font-bold">
                                            {fieldErrors.dueDate}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {editingTask && (
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
                                        Status
                                    </label>
                                    <select
                                        className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all font-medium text-slate-900 appearance-none"
                                        value={newTask.status}
                                        onChange={(e) =>
                                            setNewTask({
                                                ...newTask,
                                                status: e.target.value as TaskStatus,
                                            })
                                        }
                                    >
                                        {Object.values(TaskStatus).map((s) => (
                                            <option key={s} value={s}>
                                                {s.replace("_", " ")}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <div className="pt-8">
                                <button
                                    onClick={handleSaveTask}
                                    className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 hover:shadow-indigo-200 hover:-translate-y-1 transition-all"
                                >
                                    {editingTask ? "Save Changes" : "Launch Task"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {taskToDelete && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[60] p-4 animate-in fade-in duration-300">
                    <div className="bg-white rounded-[32px] shadow-2xl max-w-sm w-full p-8 text-center animate-in zoom-in-95 duration-300">
                        <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Trash2 className="w-8 h-8 text-rose-600" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-2">
                            Are you sure?
                        </h3>
                        <p className="text-slate-500 font-medium mb-8">
                            This action cannot be undone. This task will be permanently
                            removed.
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setTaskToDelete(null)}
                                className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-bold transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteTask}
                                className="flex-1 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-bold shadow-lg shadow-rose-100 transition-all"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* View Task Details Modal */}
            {viewingTask && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
                    <div className="bg-white rounded-[32px] shadow-2xl max-w-lg w-full p-10 relative animate-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-50 rounded-2xl">
                                    <Eye className="w-6 h-6 text-blue-600" />
                                </div>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                                    Task Details
                                </h2>
                            </div>
                            <button
                                onClick={() => setViewingTask(null)}
                                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-50 transition-colors text-slate-400 text-2xl font-light"
                            >
                                ×
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 mb-2">Title</h3>
                                <div className="text-xl font-bold text-slate-900 leading-tight">
                                    {viewingTask.title}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 mb-2">Description</h3>
                                <div className="bg-slate-50 rounded-2xl p-5 text-slate-600 leading-relaxed text-sm">
                                    {viewingTask.description || "No description provided."}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 mb-2">Assignee</h3>
                                    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl">
                                        <div className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs uppercase">
                                            {viewingTask.assignee.charAt(0)}
                                        </div>
                                        <div className="font-bold text-slate-700 text-sm">
                                            {viewingTask.assignee}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 mb-2">Due Date</h3>
                                    <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-2xl text-slate-700 font-medium text-sm">
                                        <Calendar className="w-4 h-4 text-slate-400" />
                                        {new Date(viewingTask.dueDate).toLocaleDateString(undefined, {
                                            weekday: 'short',
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 mb-2">Assigned By</h3>
                                    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl">
                                        <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-orange-700 font-bold text-xs uppercase">
                                            {viewingTask.assignedBy?.charAt(0) || "?"}
                                        </div>
                                        <div className="font-bold text-slate-700 text-sm">
                                            {viewingTask.assignedBy || "Unknown"}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {viewingTask.createdAt && (
                                        <div>
                                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 mb-1">Created At</h3>
                                            <div className="text-xs font-semibold text-slate-500 pl-1">
                                                {new Date(viewingTask.createdAt).toLocaleString()}
                                            </div>
                                        </div>
                                    )}
                                    {viewingTask.updatedAt && (
                                        <div>
                                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 mb-1">Last Updated</h3>
                                            <div className="text-xs font-semibold text-slate-500 pl-1">
                                                {new Date(viewingTask.updatedAt).toLocaleString()}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 mb-2">Priority</h3>
                                    <div className={`inline-flex px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider ${viewingTask.priority === TaskPriority.HIGH
                                        ? "bg-rose-50 text-rose-600"
                                        : viewingTask.priority === TaskPriority.MEDIUM
                                            ? "bg-amber-50 text-amber-600"
                                            : "bg-slate-50 text-slate-500"
                                        }`}>
                                        {viewingTask.priority}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 mb-2">Status</h3>
                                    <div className={`inline-flex px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider ${viewingTask.status === TaskStatus.COMPLETED
                                        ? "bg-emerald-50 text-emerald-600"
                                        : viewingTask.status === TaskStatus.IN_PROGRESS
                                            ? "bg-indigo-50 text-indigo-600 border border-indigo-100"
                                            : "bg-slate-50 text-slate-500"
                                        }`}>
                                        {viewingTask.status.replace("_", " ")}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button
                                    onClick={() => {
                                        openEditModal(viewingTask);
                                        setViewingTask(null);
                                    }}
                                    className="text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-4 py-2 rounded-xl transition-colors"
                                >
                                    Edit Task
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
