import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

type InitialState = {
    value: Product;
};

const initialState: InitialState = {
    value: {
        id: 0,
        title: "",
        slug: "",
        isbn: "",
        description: "",
        price: 0,
        stockQuantity: 0,
        pages: 0,
        language: "",
        publishYear: 0,
        status: "",
        publisherName: "",
        authors: [],
        categories: [],
        images: [],
        rating: 0,
        reviewCount: 0,
    },
};

export const quickView = createSlice({
    name: "quickView",
    initialState,
    reducers: {
        updateQuickView: (_, action: PayloadAction<Product>) => {
            return {
                value: {
                    ...action.payload,
                },
            };
        },

        resetQuickView: () => {
            return {
                value: initialState.value,
            };
        },
    },
});

export const { updateQuickView, resetQuickView } = quickView.actions;
export default quickView.reducer;
