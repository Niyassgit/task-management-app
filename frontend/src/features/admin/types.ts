export const TaskStatus = {
    TO_DO: "TO_DO",
    IN_PROGRESS: "IN_PROGRESS",
    COMPLETED: "COMPLETED",
    OVERDUE: "OVERDUE",
} as const;
export type TaskStatus = typeof TaskStatus[keyof typeof TaskStatus];

export const TaskPriority = {
    LOW: "LOW",
    MEDIUM: "MEDIUM",
    HIGH: "HIGH",
} as const;
export type TaskPriority = typeof TaskPriority[keyof typeof TaskPriority];

export interface Task {
    id: string;
    title: string;
    description?: string;
    assignee: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
}

export interface User {
    id: string;
    name: string;
    role: string;
    workRole: string;
}

export interface AdminContextType {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    users: User[];
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export interface createTaskType {
    title: string;
    description?: string;
    assignee: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
}