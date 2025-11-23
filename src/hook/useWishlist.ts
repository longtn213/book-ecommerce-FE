"use client";

import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { toggleWishlistAPI } from "@/services/wishlistService";
import { toggleWishlist } from "@/redux/features/wishlist-slice";
import { useAuthContext } from "@/context/AuthContext";

export const useWishlist = () => {
    const dispatch = useDispatch();
    const { user, requireLogin } = useAuthContext();

    // Redux wishlist
    const wishlist = useAppSelector((state) => state.wishlistReducer.items) || [];

    // Kiểm tra 1 sách đã trong wishlist chưa
    const isWishlisted = (bookId: number) => {
        return wishlist.some((w) => w.bookId === bookId);
    };

    // Thêm hoặc xoá một sách khỏi wishlist (API + Redux)
    const toggle = async (book: {
        id: number;
        title: string;
        authorName: string;
        price: number;
        coverUrl: string;
    }) => {
        if (!user) {
            requireLogin("thêm sản phẩm vào danh sách yêu thích");
            return;
        }

        try {
            await toggleWishlistAPI(book.id);

            dispatch(
                toggleWishlist({
                    bookId: book.id,
                    title: book.title,
                    authorName: book.authorName || "",
                    price: book.price,
                    coverUrl: book.coverUrl,
                })
            );
        } catch (err) {
            console.error("Wishlist toggle error:", err);
        }
    };

    return {
        wishlist,
        isWishlisted,
        toggle,
    };
};
