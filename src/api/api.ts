import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { SERVER_ADDR } from "../config/config";
import { TOKEN } from "../constants/Common";

export const api = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
    baseURL: SERVER_ADDR,
    withCredentials: true,
});

const onRequest = async (config: AxiosRequestConfig): Promise<any> => {
    const token = localStorage.getItem(TOKEN);
    if (!token) return config;
    return {
        ...config,
        headers: { ...config.headers, Authorization: `Bearer ${JSON.parse(localStorage.getItem(TOKEN) || "[]")}` },
    };
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
    if (error.response?.status === 401) {
        localStorage.removeItem(TOKEN);
    }
    return Promise.reject(error);
};

api.interceptors.request.use(onRequest);

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    onResponseError
);
