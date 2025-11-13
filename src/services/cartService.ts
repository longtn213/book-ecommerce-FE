import axiosInstance from "@/services/axiosInstance";

export const getUserCart = async () => {
    const res = await axiosInstance.get("/cart");
    return res.data.data;  // { items: [], totalAmount: 0 }
};