import { api } from "./api";
import { Task } from "./Response";

const getTasks = async (params: { status: string }) => {
    return api.get("/task", { params });
};

const updateTasks = async (taskId: string, updates: Task) => {
    return api.put(`/task/${taskId}`, updates);
};
export { getTasks, updateTasks };
