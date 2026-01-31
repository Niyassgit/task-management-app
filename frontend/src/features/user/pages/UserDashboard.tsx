import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { logout } from "../../auth/authSlice";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Circle,
  Clock,
  LogOut,
  LayoutDashboard,
  CheckSquare,
  ChevronRight
} from "lucide-react";
import { getUserTasks, updateTaskStatus } from "../api";
import { TaskStatus, TaskPriority } from "../../admin/types";
import { toast } from "react-toastify";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  overDue: string;
}

const UserDashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getUserTasks();
      setTasks(data);
    } catch (error) {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      setTasks(tasks.map(t => t._id === taskId ? { ...t, status: newStatus } : t));
      toast.success(`Task marked as ${newStatus.replace('_', ' ')}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case TaskStatus.IN_PROGRESS:
        return <Clock className="w-5 h-5 text-blue-500" />;
      case TaskStatus.OVERDUE:
        return <Circle className="w-5 h-5 text-rose-500" />;
      default:
        return <Circle className="w-5 h-5 text-slate-300" />;
    }
  };

  const getStatusStyles = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED: return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case TaskStatus.IN_PROGRESS: return "bg-blue-50 text-blue-700 border-blue-100";
      case TaskStatus.OVERDUE: return "bg-rose-50 text-rose-700 border-rose-100";
      default: return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case TaskPriority.HIGH: return "bg-rose-50 text-rose-600 border-rose-100";
      case TaskPriority.MEDIUM: return "bg-amber-50 text-amber-600 border-amber-100";
      default: return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-full w-20 bg-white border-r border-slate-100 flex flex-col items-center py-8 gap-10 z-50">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
          <CheckSquare className="text-white w-7 h-7" />
        </div>

        <nav className="flex flex-col gap-6">
          <button className="p-3 bg-indigo-50 text-indigo-600 rounded-xl transition-all">
            <LayoutDashboard className="w-6 h-6" />
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
        >
          <LogOut className="w-6 h-6" />
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="pl-20">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 px-10 py-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Workstream</h1>
            <p className="text-slate-500 text-sm font-medium">Welcome back, {user?.name || "Professional"}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900">{user?.name}</p>
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">{user?.workRole || "Team Member"}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold shadow-md">
              {user?.name?.charAt(0) || "U"}
            </div>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-10 py-10">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Your Tasks</h2>
              <p className="text-slate-500 text-sm mt-1">Manage your active projects and assignments</p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 shadow-sm">
                {tasks.length} Total
              </span>
              <span className="px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-lg text-xs font-bold text-emerald-600 shadow-sm">
                {tasks.filter(t => t.status === TaskStatus.COMPLETED).length} Done
              </span>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin mb-4" />
              <p className="text-slate-400 font-bold">Synchronizing tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="bg-white rounded-3xl border border-dashed border-slate-200 p-20 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckSquare className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Clear horizon ahead</h3>
              <p className="text-slate-400 text-sm max-w-xs mx-auto">No tasks have been assigned to you yet. Sit tight or check back later!</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group animate-in fade-in slide-in-from-bottom-2 duration-500"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {getStatusIcon(task.status)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className={`text-lg font-bold transition-all ${task.status === TaskStatus.COMPLETED ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                          {task.title}
                        </h3>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${getStatusStyles(task.status)}`}>
                            {task.status.replace('_', ' ')}
                          </span>
                          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </div>
                      </div>

                      <p className={`text-sm mb-4 leading-relaxed ${task.status === TaskStatus.COMPLETED ? 'text-slate-300' : 'text-slate-500'}`}>
                        {task.description || "No description provided for this work item."}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                        <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Due {new Date(task.overDue).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          </div>
                        </div>

                        <div className="relative group/select">
                          <select
                            value={task.status}
                            onChange={(e) => handleStatusChange(task._id, e.target.value as TaskStatus)}
                            className={`appearance-none pl-4 pr-10 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer outline-none border-none ${task.status === TaskStatus.COMPLETED
                                ? 'bg-emerald-50 text-emerald-600'
                                : task.status === TaskStatus.IN_PROGRESS
                                  ? 'bg-blue-50 text-blue-600'
                                  : 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700'
                              }`}
                          >
                            <option value={TaskStatus.TO_DO}>To Do</option>
                            <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
                            <option value={TaskStatus.COMPLETED}>Completed</option>
                            <option value={TaskStatus.OVERDUE}>Overdue</option>
                          </select>
                          <ChevronRight className={`absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none rotate-90 ${task.status === TaskStatus.TO_DO ? 'text-white' : ''}`} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
