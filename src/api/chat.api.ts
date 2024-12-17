import { api } from "./api";

export type createChatRequest = {
    message: string;
};

const createChat = async (body: createChatRequest) => {
    return api.post("/ai/chat", body);
};

export { createChat };
