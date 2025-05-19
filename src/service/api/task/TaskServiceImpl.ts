import type { TaskService } from "./TaskService";
import type { Page } from "../../../types/Page";
import type { CreateTask, UpdateTask, Task } from "../../../types/Task";
import type { ApiClient } from "../ApiClient";

export class TaskServiceImpl implements TaskService {
    
    private client: ApiClient;

    constructor(client: ApiClient) {
        this.client = client;
    }

    async getTasks(params: Record<string, string>): Promise<Task[]> {
        return this.client.get<Task[]>('/tasks', params);
    }

    async getTaskById(id: number): Promise<Task> {
        return this.client.get<Task>(`/tasks/${id}`);
    }

    async createTask(task: CreateTask): Promise<Task> {
        return this.client.post<Task>('/tasks', task);
    }

    async updateTask(id: number, task: UpdateTask): Promise<Task> {
        return this.client.put<Task>(`/tasks/${id}`, task);
    }

    async deleteTask(id: number): Promise<void> {
        return this.client.delete<void>(`/tasks/${id}`);
    }
}