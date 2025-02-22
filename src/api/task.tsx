import { ResponseFormat } from "../utils/ResponseFormat";
import { SERVER_ADDR } from "../config/config";
import { api } from "./api";
import { toast } from "react-toastify";
import { BaseResponse } from "./Response";

export const listTaskFetch = async (
    currentPage: number,
    tasksPerPage: number,
    statusFilter: string | "",
    priorityFilter: string | "",
    token: string,
    searchQuery: string,
    sortBy: string
): Promise<ResponseFormat | null> => {
    try {
        const response = await fetch(
            `${SERVER_ADDR}/task?page=${currentPage}&size=${tasksPerPage}&status=${statusFilter}&priority=${priorityFilter}&search=${searchQuery}&sort_by=${sortBy}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include",
            }
        );

        const result = new ResponseFormat(await response.json());
        if (!result.success) {
            throw new Error(result.data);
        }

        return result;
    } catch (error) {
        toast.error(`Error fetching tasks: ${error}`);
    }

    return null;
};

export const addTaskFetch = async (
    taskData: {
        name: string;
        description: string;
        status: string;
        priority: string;
        start_time: number | null;
        end_time: number | null;
    },
    token: string
): Promise<ResponseFormat | null> => {
    try {
        const response = await fetch(`${SERVER_ADDR}/task`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
            body: JSON.stringify(taskData),
        });

        const result = new ResponseFormat(await response.json());
        if (!result.success) {
            throw new Error(result.data);
        }

        return result;
    } catch (error) {
        toast.error(`Error adding task: ${error}`);
    }

    return null;
};

export const updateTaskFetch = async (
    taskData: {
        name: string;
        description: string;
        status: string;
        priority: string;
        start_time: number | null;
        end_time: number | null;
    },
    token: string,
    id: number
): Promise<ResponseFormat | null> => {
    try {
        const response = await fetch(`${SERVER_ADDR}/task/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
            body: JSON.stringify(taskData),
        });

        const result = new ResponseFormat(await response.json());
        if (!result.success) {
            throw new Error(result.data);
        }

        return result;
    } catch (error) {
        toast.error(`Error updating task: ${error}`);
    }

    return null;
};

export const deleteTaskFetch = async (
    token: string,
    id: number
): Promise<ResponseFormat | null> => {
    try {
        const response = await fetch(`${SERVER_ADDR}/task/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });

        const result = new ResponseFormat(await response.json());
        if (!result.success) {
            throw new Error(result.data);
        }

        return result;
    } catch (error) {
        toast.error(`Error deleting task: ${error}`);
    }

    return null;
};

export const reportTaskFetch = async (startDate: number, endDate: number) => {
    try {
        const response = await api.get(`/task/report`, {
            params: {
                startDate: startDate,
                endDate: endDate,
            },
        });

        return response.data;
    } catch (error) {
        toast.error("Failed to fetch report data");
    }
};

export type AnalyticTask = {
    status: string;
    quantity: string;
};

export const analyticTaskFetch = async (): Promise<
    BaseResponse<Array<AnalyticTask>>
> => {
    return (await api.get("/task/analytic")).data;
};
