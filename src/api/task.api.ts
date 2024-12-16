import { api } from "./api";

const getTasks = async (params: { status: string }) => {
    return api.get("/task", { params });
};

export { getTasks };
