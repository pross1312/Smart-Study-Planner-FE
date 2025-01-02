import { api } from "./api";

export type updateUserRequest = {
    avatar: File | null;
    name: string;
    email: string;
};

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


const getProfile = async () => {
    return api.get("/user");
};

export { updateUser, getProfile };
