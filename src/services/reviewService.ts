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
export const fetchReviewsByBookId = async (bookId: number) => {
    try {
        const res = await axiosInstance.get(`/reviews/book/${bookId}`);
        return res.data?.data || [];

    } catch (error) {
        console.error("Error fetching book:", error);
        return [];
    }
};
export const fetchUserReviewForBook = async (bookId: number) => {
    try {
        const res = await axiosInstance.get(`/reviews/user/book/${bookId}`);
        return res.data?.data || [];

    } catch (error) {
        console.error("Error fetching book:", error);
        return [];
    }
};
export const fetchUserReview = async () => {
    try {
        const res = await axiosInstance.get(`/reviews/user`);
        return res.data?.data || [];

    } catch (error) {
        console.error("Error fetching book:", error);
        return [];
    }
};
export const createReviewAPI = async (body: {
    orderItemId: number;
    rating: number;
    comment: string;
}) => {
    const res = await axiosInstance.post("/reviews/order", body);
    return res.data?.data;
};
export const updateReviewAPI = async (body: {
    reviewId: number;
    rating: number;
    comment: string;
}) => {
    const res = await axiosInstance.put("/reviews/order", body);
    return res.data?.data;
};
export const deleteReviewAPI = async (reviewId: number) => {
const res = await axiosInstance.delete(`/reviews/order/${reviewId}`,);
    return res.data?.data;
};