export interface Task {
    id: string;
    title: string;
    description?: string;
    assignee: string;
    status: "pending" | "in-progress" | "completed";
    priority: "low" | "medium" | "high";
    dueDate: string;
}

export interface User {
    id: string;
    name: string;
    role: string;
}

export interface AdminContextType {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    users: User[];
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}
