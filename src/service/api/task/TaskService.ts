import type { Page } from "../../../types/Page";
import type { CreateTask, Task, UpdateTask } from "../../../types/Task";
import { apiClient } from "../ApiClient";
import { TaskServiceImpl } from "./TaskServiceImpl";

export interface TaskService {
    getTasks(params:Record<string, string>): Promise<Task[]>;
    getTaskById(id: number): Promise<Task>;
    createTask(task: CreateTask): Promise<Task>;
    updateTask(id: number, task: UpdateTask): Promise<Task>;
    deleteTask(id: number): Promise<void>;
}

export const taskService:TaskService = new TaskServiceImpl(apiClient);