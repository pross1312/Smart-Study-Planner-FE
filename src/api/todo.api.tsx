import { api } from "./api";

export type createTodoRequest = {
    taskId: number;
    startDate: string;
};

const getTodos = async (params: { startDate: string; endDate: string }) => {
    return api.get("/task", { params });
};

const createTodo = async (body: createTodoRequest) => {
    return api.post("/todo", body);
};

export { getTodos, createTodo };
