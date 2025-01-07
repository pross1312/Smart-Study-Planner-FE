// Define the Task interface
interface Task {
    id: number;
    user_id: string;
    name: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    start_time: number | null;
    end_time: number | null;
    created_date: number; 
    updated_date: number;
    is_deleted: boolean;
}

// Define the Todo interface
interface Todo {
    id: number;
    user_id: number;
    task_id: string;
    start_date: number;
    end_date: number;
    task: Task;
}

// Define the BaseResponse interface
export interface BaseResponse<T> {
    success: boolean;
    statusCode: number;
    data: T;
}

export enum TaskPriority {
    Low = "LOW",
    Medium = "MEDIUM",
    High = "HIGH",
}

export enum TaskStatus {
    ToDo = "TODO",
    InProgress = "IN_PROGRESS",
    Done = "DONE",
    Expired = "EXPIRED",
}

export interface TaskPagination<T> {
    tasks: T[];
    total: { count: string };
}

export type Quote ={
    quote: string;
    author: string;
}

// Define the specific response type for your example
type TodoResponse = BaseResponse<Todo[]>;
type TaskResponse = BaseResponse<Task[]>;

export type { Todo, Task, TodoResponse, TaskResponse };
