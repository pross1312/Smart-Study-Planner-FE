import { ResponseFormat } from "../utils/ResponseFormat";
import { SERVER_ADDR } from "../config/config";

const Task = async (currentPage: number, tasksPerPage: number, statusFilter: string | "", priorityFilter: string | "", token: string): Promise<ResponseFormat | null> => {
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

export default Task;
