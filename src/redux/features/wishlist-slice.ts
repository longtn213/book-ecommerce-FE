import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type WishListItem = {
    bookId: number;
    title: string;
    authorName: string;
    price: number;
    coverUrl: string;
};

type InitialState = {
    items: WishListItem[];
};

const initialState: InitialState = {
    items: [],
};

export const wishlist = createSlice({
    name: "wishlist",
    initialState,

    reducers: {
        /** Load full wishlist từ API */
        setWishlist: (state, action: PayloadAction<WishListItem[]>) => {
            state.items = action.payload;
        },

        /** Toggle: nếu có → xoá. Không có → thêm */
        toggleWishlist: (state, action: PayloadAction<WishListItem>) => {
            const exists = state.items.find(
                (item) => item.bookId === action.payload.bookId
            );

            if (exists) {
                state.items = state.items.filter(
                    (item) => item.bookId !== action.payload.bookId
                );
            } else {
                state.items.push(action.payload);
            }
        },

        /** Xoá 1 item (khi BE trả về xoá thành công) */
        removeWishlistItem: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(
                (item) => item.bookId !== action.payload
            );
        },

        /** Clear toàn bộ */
        clearWishlist: (state) => {
            state.items = [];
        },
    },
});

export const {
    setWishlist,
    toggleWishlist,
    removeWishlistItem,
    clearWishlist,
} = wishlist.actions;

export default wishlist.reducer;
