import axiosInstance from "@/services/axiosInstance";

export const fetchEBookById = async (bookId : number) => {
    try {
        const res = await axiosInstance.get(`/ebooks/by-book/${bookId}`);
        return res.data?.data || [];
    } catch (error) {
        console.error("Error fetching book:", error);
        return [];
    }
};