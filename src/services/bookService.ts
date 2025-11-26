import axiosInstance from "@/services/axiosInstance";

export const searchBooks = async ({
                                      page = 0,
                                      size = 10,
                                      keyword = "",
                                      categoryId = "",
                                      authorId = "",
                                      publisherId = "",
                                      minPrice = "",
                                      maxPrice = "",
                                      status = "ACTIVE",
                                  }) => {

    const params: Record<string, any> = { page, size,status };

    if (keyword) params.keyword = keyword;
    if (categoryId) params.categoryId = categoryId;
    if (authorId) params.authorId = authorId;
    if (publisherId) params.publisherId = publisherId;

    if (minPrice !== "" && minPrice != null) params.minPrice = minPrice;
    if (maxPrice !== "" && maxPrice != null) params.maxPrice = maxPrice;

    const res = await axiosInstance.get("/books", { params });

    return res.data.data;
};
export const fetchBookById = async (bookId : number) => {
    try {
        const res = await axiosInstance.get(`/books/${bookId}`);
        return res.data?.data || [];
    } catch (error) {
        console.error("Error fetching book:", error);
        return [];
    }
};
export const fetchNewestBook = async () => {
    try {
        const res = await axiosInstance.get("/books/newest");
        return res.data?.data || [];
    } catch (error) {
        console.error("Error fetching newest books:", error);
        return [];
    }
};
export const fetchFeatureBook = async (
    type: string,
    page: number = 0,
    size: number = 12
) => {
    try {
        const res = await axiosInstance.get(`/books/feature`,
            {
                params: { type, page, size }
            }
        );

        return res.data.data; // TRẢ FULL PAGE
    } catch (error) {
        console.error("Error fetching feature books:", error);
        return {
            content: [],
            totalPages: 0,
            number: 0,
            size: size,
        };
    }
};

export const fetchRelatedBook = async (bookId : number , type :string) => {
    try {
        const res = await axiosInstance.get(`/books/related/${bookId}?type=${type}`);
        return res.data?.data || [];

    } catch (error) {
        console.error("Error fetching book:", error);
        return [];
    }
};

