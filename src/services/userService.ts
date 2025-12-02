import axiosInstance from "@/services/axiosInstance";

export const getCurrentUser = async () => {
    const res = await axiosInstance.get("/user");
    return res.data.data;
};
export const updateUserProfile = async (data) => {
    const res = await axiosInstance.put("/user/update", data);
    return res.data;
};

export const changePasswordApi = async (data) => {
    const res = await axiosInstance.put("/user/change-password", data);
    return res.data;
};
export const uploadAvatarApi = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axiosInstance.post(
        "/user/avatar?file",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return res.data;
};
export const getUserOrders = async (orderStatus?: string) => {
    const query = orderStatus ? `?status=${orderStatus}` : "";
    const res = await axiosInstance.get("/orders" + query);
    return res.data.data;
};
export const cancelOrderApi = async (orderId: number) => {
    const res = await axiosInstance.put(`/orders/${orderId}/cancel`);
    return res.data;
};

export const getUserNotifications = async () => {
    const res = await axiosInstance.get("/notifications");
    return res.data.data;
};

export const markAllNotificationsRead = async () => {
    return axiosInstance.put("/notifications/read-all");
};