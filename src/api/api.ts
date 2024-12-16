import axios, { AxiosError, AxiosResponse } from "axios";
import { SERVER_ADDR } from "../config/config";
import { TOKEN } from "../constants/Common";

export const api = axios.create({
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem(TOKEN) || "[]")}`,
    },
    baseURL: SERVER_ADDR,
    withCredentials: true,
});

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
    if (error.response?.status === 401) {
        localStorage.removeItem(TOKEN);
    }
    return Promise.reject(error);
};

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    onResponseError
);
