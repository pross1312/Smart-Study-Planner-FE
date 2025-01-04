import { api } from "./api";
import { BaseResponse, Task, TaskPagination } from "./Response";

const getTasks = async (params?: {
    status?: string;
    startDate?: string;
    endDate?: string;
}): Promise<BaseResponse<TaskPagination<Task>>> => {
    return (await api.get("/task", params ? { params } : undefined)).data;
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
