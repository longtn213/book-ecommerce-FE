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
export const forgotPasswordApi = async (data: { email: string, domain: string }) => {
    try {
        const res = await axiosInstance.post("/auth/forgot-password", data);
        return res.data;
    } catch (error: any) {
        throw error.response?.data || error;
    }
};
export const resetPasswordApi = async (data: { token: string; newPassword: string }) => {
    try {
        const res = await axiosInstance.post("/auth/reset-password", data);
        return res.data;
    } catch (err: any) {
        throw err.response?.data || err;
    }
};
