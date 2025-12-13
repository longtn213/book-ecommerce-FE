import axiosInstance from "@/services/axiosInstance";

export const checkout = async (body:any) => {
    const res = await axiosInstance.post(`/orders/checkout`, body);
    return res.data.data;
};

export const getOrderId = async (orderId: number) => {
    const res = await axiosInstance.get(`/orders/${orderId}`);
    return res.data.data;
};

export const payAgain = async (orderId:number) => {
    const res = await axiosInstance.post(`/orders/${orderId}/pay-again`);
    return res.data.data;
};