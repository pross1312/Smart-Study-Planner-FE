// Define the Task interface
interface Task {
    id: string;
    user_id: string;
    name: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    estimate_time: number;
    created_date: number; 
    updated_date: number;
    is_deleted: boolean;
}

// Define the Todo interface
interface Todo {
    id: string;
    user_id: string;
    task_id: string;
    start_date: string; // Timestamp as a string
    end_date: string; // Timestamp as a string
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
    ToDo = "todo",
    InProgress = "IN_PROGRESS",
    Done = "DONE",
}

// Define the specific response type for your example
type TodoResponse = BaseResponse<Todo[]>;
type TaskResponse = BaseResponse<Task[]>;

export type { Todo, Task, TodoResponse, TaskResponse };
