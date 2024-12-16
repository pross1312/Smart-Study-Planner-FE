import { ResponseFormat } from "../utils/ResponseFormat";
import { SERVER_ADDR } from "../config/config";

export const listTaskFetch = async (currentPage: number, tasksPerPage: number, statusFilter: string | "", priorityFilter: string | "", token: string): Promise<ResponseFormat | null> => {
  try {
    const response = await fetch(`${SERVER_ADDR}/task?page=${currentPage}&size=${tasksPerPage}&status=${statusFilter}&priority=${priorityFilter}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
        },
        credentials: 'include'
    });
    
    const result = new ResponseFormat(await response.json());
    if (!result.success) {
      throw new Error(result.data);
    }

    return result;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    alert(error);
  }

  return null;
};

export const addTaskFetch = async (taskData: { name: string, description: string; status: string; priority: string, estimate_time: string }, token: string): Promise<ResponseFormat | null> => {
  try {
    const response = await fetch(`${SERVER_ADDR}/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(taskData)
    });

    const result = new ResponseFormat(await response.json());
    if (!result.success) {
      throw new Error(result.data);
    }

    return result;
  } catch (error) {
    console.error("Error adding task:", error);
    alert(error);
  }

  return null;
};

export const upadteTaskFetch = async (taskData: { name: string, description: string; status: string; priority: string, estimate_time: string}, token: string, id: string): Promise<ResponseFormat | null> => {
  try {
    const response = await fetch(`${SERVER_ADDR}/task/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(taskData)
    });

    const result = new ResponseFormat(await response.json());
    if (!result.success) {
      throw new Error(result.data);
    }

    return result;
  } catch (error) {
    console.error("Error adding task:", error);
    alert(error);
  }

  return null;
};


export const deleteTaskFetch = async (token: string, id: string): Promise<ResponseFormat | null> => {
  try {
    const response = await fetch(`${SERVER_ADDR}/task/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      credentials: 'include',
    });

    const result = new ResponseFormat(await response.json());
    if (!result.success) {
      throw new Error(result.data);
    }

    return result;
  } catch (error) {
    console.error("Error adding task:", error);
    alert(error);
  }

  return null;
};