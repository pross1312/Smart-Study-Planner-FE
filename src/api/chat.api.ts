import { api } from "./api";
import { BaseResponse } from "./Response";

export type createChatRequest = {
    prompt: string;
};

export enum Role {
    Model = 'model',
    User = 'user',
}

export interface AIHistory {
    id: number;
    user_id: number;
    created_date: number;
    role: Role;
    content: string;
}

export const createChat = async (body: createChatRequest) => {
    return api.post("/ai/chat", body);
};

export const getChatHistory = async (): Promise<BaseResponse<Array<AIHistory>>> => {
    return (
        await api.get("/ai/chat")
    ).data;
};

export const listModels = async (): Promise<BaseResponse<{models: Array<string>, current: string}>> => {
    return (
        await api.get("/ai/model")
    ).data;
};

export const clearHistory = async (): Promise<BaseResponse<void>> => {
    return (
        await api.delete("/ai/chat")
    ).data;
};

export const analyzeSchedule = async (): Promise<BaseResponse<string>> => {
    return (
        await api.get("/ai/schedule/analytic")
    ).data;
};

export const changeModel = async (model: string): Promise<BaseResponse<string>> => {
    return (
        await api.put("/ai/model", {model})
    ).data;
};

export const analyticTask = async (): Promise<BaseResponse<string>> => {
    return (
        await api.get("/ai/schedule/analytic")
    ).data;
};

export const applySuggestion = async (body: any): Promise<BaseResponse<string>> => {
    return (
        await api.post("/ai/suggestion/apply", body)
    ).data;
};
