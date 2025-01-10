import { api } from "./api";
import { BaseResponse } from "./Response";

export type updateUserRequest = {
    avatar: File | null;
    name: string;
    email: string;
};

export type Profile = {
    id: number;
    name: string;
    email: string;
    avatar: string;
};

export interface LeaderboardEntry {
    email: string;
    name: string;
    time_span: number; // minutes
    avatar: string;
}

const updateUser = async (body: updateUserRequest) => {
    const formData = new FormData();
    formData.append("name", body.name);
    formData.append("email", body.email);

    if (body.avatar) {
        formData.append("avatar", body.avatar);
    }

    return await api.put("/user", formData, {
        headers: {
            "Content-Type": "multipart/form-data", // Explicitly set the header for this request
        },
    });
};

const getProfile = async (userId: string): Promise<BaseResponse<Profile>> => {
    return (await api.get(`/auth/profile/${userId}`)).data;
};

const getProfileWithOutId = async (): Promise<BaseResponse<Profile>> => {
    return (await api.get(`/user/profile`)).data;
};

const getLeaderboard = async (
    page: number,
    page_size: number,
): Promise<BaseResponse<Array<LeaderboardEntry>>> => {
    return (
        await api.get(`/auth/leaderboard`, {
            params: {
                page,
                page_size,
            },
        })
    ).data;
};

const sendResetPasswordEmail = async (
    email: string
): Promise<BaseResponse<string>> => {
    return await api.get(encodeURI(`/auth/password/reset/${email}`));
};

export { updateUser, getProfile, getLeaderboard, sendResetPasswordEmail, getProfileWithOutId };
