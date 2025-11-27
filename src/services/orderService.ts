import axiosInstance from "@/services/axiosInstance";

export const checkout = async (body:any) => {
    const res = await axiosInstance.post(`/orders/checkout`, body);
    return res.data.data;  // { items: [], totalAmount: 0 }
};