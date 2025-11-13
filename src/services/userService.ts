import axiosInstance from "@/services/axiosInstance";

export const getCurrentUser = async () => {
    const res = await axiosInstance.get("/user");
    return res.data.data;
};
export const updateUserProfile = async (data) => {
    const res = await axiosInstance.put("/user/update", data);
    return res.data; // ⚡ return full response
};

export const changePasswordApi = async (data) => {
    const res = await axiosInstance.put("/user/change-password", data);
    return res.data; // ⚡ return full response
};
