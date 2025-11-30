import { createSlice } from "@reduxjs/toolkit";
import { Book } from "@/types/book";

export interface ProductDetailsState {
    product: Book | null;
    activeIndex: number;
}

const initialState: ProductDetailsState = {
    product: null,
    activeIndex: 0,
};

export const productDetails = createSlice({
    name: "productDetails",
    initialState,
    reducers: {
        updateProductDetails: (state, action) => {
            state.product = action.payload;
            state.activeIndex = 0;
        },
        setActiveIndex: (state, action) => {
            state.activeIndex = action.payload;
        }
    },
});

export const { updateProductDetails, setActiveIndex } = productDetails.actions;
export default productDetails.reducer;
