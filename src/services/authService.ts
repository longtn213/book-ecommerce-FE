import axiosInstance from "@/services/axiosInstance";

export const login = async (username: string, password: string) => {
    const res = await axiosInstance.post("/auth/login", {
        username,
        password,
    });
    return res.data;
};
