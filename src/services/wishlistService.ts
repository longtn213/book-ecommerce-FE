import axiosInstance from "@/services/axiosInstance";

export const fetchWishlistAPI = async () => {
    const res = await axiosInstance.get("/wishlist");
    return res.data;
};

export const toggleWishlistAPI = async (bookId: number) => {
    const res = await axiosInstance.post(`/wishlist/${bookId}`);
    return res.data;
};