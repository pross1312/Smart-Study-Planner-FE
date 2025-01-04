import { api } from "./api";
import { BaseResponse } from "./Response";

export type History = {
    id?: number;
    user_id: number;
    start_time: number;
    end_time: number;
    span: number;
};

const getSetting = async () => {
    return api.get(`/pomodoro/setting`);
};

const updateSetting = async (
    pomodoro_time: number,
    break_time: number,
    long_break_time: number
) => {
    return api.put(`/pomodoro/setting`, {
        pomodoro_time,
        break_time,
        long_break_time,
    });
};

const getHistory = async (params?: {
    page?: number;
    size?: number;
    startTime?: string;
    endTime?: string;
}): Promise<BaseResponse<Array<History>>> => {
    return (await api.get("/pomodoro/history", params ? { params } : undefined))
        .data;
};

const addHistory = async (startTime: number, endTime: number, span: number) => {
    return api.post("/pomodoro/history", { startTime, endTime, span });
};

export { getSetting, updateSetting, getHistory, addHistory };
