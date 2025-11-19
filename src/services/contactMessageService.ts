import axiosInstance from "@/services/axiosInstance";

export const sendMessage = async (data) => {
    try {
        const res = await axiosInstance.post("/contact/send", data);
        return res.data;
    } catch (error: any) {
        throw error.response?.data || error;
    }
};