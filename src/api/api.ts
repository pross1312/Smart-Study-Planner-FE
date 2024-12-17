import axios, { AxiosError, AxiosResponse } from "axios";
import { SERVER_ADDR } from "../config/config";
import { TOKEN } from "../constants/Common";

export const api = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
    baseURL: SERVER_ADDR,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN);
    if (token) {
        config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }
    return config;
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
