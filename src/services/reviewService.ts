import axiosInstance from "@/services/axiosInstance";

export const fetchNewestReviews = async () => {
    try {
        const res = await axiosInstance.get(`/reviews`);
        return res.data?.data || [];

    } catch (error) {
        console.error("Error fetching book:", error);
        return [];
    }
};