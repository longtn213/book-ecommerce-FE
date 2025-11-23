import axiosInstance from "@/services/axiosInstance";

export const getUserCart = async () => {
    const res = await axiosInstance.get("/cart");
    return res.data.data;  // { items: [], totalAmount: 0 }
};
export const addUserCart = async (bookId: number, quantity: number) => {
    const res = await axiosInstance.post(`/cart?bookId=${bookId}&quantity=${quantity}`);
    return res.data.data;  // { items: [], totalAmount: 0 }
};
export const updateUserCart = async (bookId: number, quantity: number) => {
    const res = await axiosInstance.put(`/cart?bookId=${bookId}&quantity=${quantity}`);
    return res.data.data;  // { items: [], totalAmount: 0 }
};
export const removeUserCart = async (bookIds: number[]) => {
    const res = await axiosInstance.delete("/cart/remove", {
        data: { bookIds },
    });
    return res.data.data;
};

export const clearUserCart = async () => {
    const res = await axiosInstance.delete("/cart/clear");
    return res.data.data;  // { items: [], totalAmount: 0 }
};
