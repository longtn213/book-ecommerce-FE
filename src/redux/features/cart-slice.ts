import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
    bookId: number;
    title: string;
    quantity: number;
    unitPriceSnapshot: number;
    cartItemUrl: string[];
};

export type CartState = {
    items: CartItem[];
    totalAmount: number;
};

const initialState: CartState = {
    items: [],
    totalAmount: 0,
};

export const cart = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<CartState>) => {
            state.items = action.payload.items;
            state.totalAmount = action.payload.totalAmount;
        },
        clearCartState: (state) => {
            state.items = [];
            state.totalAmount = 0;
        },
    },
});

export const { setCart, clearCartState } = cart.actions;
export default cart.reducer;
