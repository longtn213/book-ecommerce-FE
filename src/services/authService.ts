import axiosInstance from "@/services/axiosInstance";

export const loginApi = async (username: string, password: string) => {
    const res = await axiosInstance.post("/auth/login", {
        username,
        password,
    });
    return res.data;
};

export const register = async (data: {
    username: string;
    email: string;
    password: string;
    fullName: string;
}) => {
    try {
        const res = await axiosInstance.post("/auth/register", data);
        return res.data;
    } catch (error: any) {
        throw error;
    }
};
export const getCurrentUser = async () => {
    const res = await axiosInstance.get("/user");
    return res.data.data;
};