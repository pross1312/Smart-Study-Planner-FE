import { api } from "./api";
import { Task } from "./Response";

const getTasks = async (params?: {
    status?: string;
    startDate?: string;
    endDate?: string;
}) => {
    return api.get("/task", params ? { params } : undefined);
};

const getUnAssignedTasks = async () => {
    return api.get("/task/unassigned");
};

const updateTasks = async (
    taskId: string,
    start_time: number,
    end_time: number
) => {
    return api.put(`/task/${taskId}`, { start_time, end_time });
};

export { getTasks, updateTasks, getUnAssignedTasks };
