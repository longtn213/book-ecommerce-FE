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
                                  }) => {

    const params: Record<string, any> = { page, size };

    if (keyword) params.keyword = keyword;
    if (categoryId) params.categoryId = categoryId;
    if (authorId) params.authorId = authorId;
    if (publisherId) params.publisherId = publisherId;

    if (minPrice !== "" && minPrice != null) params.minPrice = minPrice;
    if (maxPrice !== "" && maxPrice != null) params.maxPrice = maxPrice;

    const res = await axiosInstance.get("/books", { params });

    return res.data.data;
};
