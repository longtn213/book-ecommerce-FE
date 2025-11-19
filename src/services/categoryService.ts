import axiosInstance from "./axiosInstance";

export const searchBooks = async (params: any) => {
    try {
        const res = await axiosInstance.get("/books", { params });
        return res.data.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};

export const fetchCategories = async () => {
    try {
        const res = await axiosInstance.get("/categories");
        return res.data?.data || [];
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};

export const fetchAuthors  = async () => {
    try {
    const res = await axiosInstance.get("/authors");
    return res.data.data;
    } catch (error) {
        console.error("Error fetching authors:", error);
        return [];
    }
};

export const fetchPublishers  = async () => {
    try {
    const res = await axiosInstance.get("/publishers");
    return res.data.data;
} catch (error) {
    console.error("Error fetching categories:", error);
    return [];
}
};
