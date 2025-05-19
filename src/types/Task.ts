export interface Task {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean,
    dueDate: string;
    createdAt:string
}

export interface CreateTask {
    title: string;
    description: string;
    isCompleted: boolean,
    dueDate: string;
}

export interface UpdateTask {
    title?: string;
    description?: string;
    isCompleted: boolean,
    dueDate?: string;
}