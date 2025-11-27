import axiosInstance from "@/services/axiosInstance";

export const applyCoupon = async (code: string, orderTotal: number) => {
    const res = await axiosInstance.post(`/coupons/apply`,{
        code,
        orderTotal: orderTotal,
    });
    return res.data.data;
};