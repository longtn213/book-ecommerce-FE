import axiosInstance from "./axiosInstance";

export const fetchCategories = async () => {
    try {
        const res = await axiosInstance.get("/categories");
        return res.data?.data || [];
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};
