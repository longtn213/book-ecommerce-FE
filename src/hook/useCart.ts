import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setCart, clearCartState } from "@/redux/features/cart-slice";

import {
    addUserCart,
    clearUserCart,
    getUserCart,
    removeUserCart,
    updateUserCart
} from "@/services/cartService";

import { useAuthContext } from "@/context/AuthContext";

export const useCart = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { setCart: setContextCart } = useAuthContext(); // ⭐ context sync

    // ------------------------------
    // ⭐ LOAD CART TỪ BE
    // ------------------------------
    const refresh = async () => {
        const cartData = await getUserCart();
        dispatch(setCart(cartData));
        setContextCart(cartData); // ⭐ sync context
    };

    // ------------------------------
    // ⭐ ADD TO CART
    // ------------------------------
    const addToCart = async (bookId: number, quantity = 1) => {
        const cartData = await addUserCart(bookId, quantity);

        dispatch(setCart(cartData));
        setContextCart(cartData);
    };

    // ------------------------------
    // ⭐ UPDATE QUANTITY
    // ------------------------------
    const updateQuantity = async (bookId: number, quantity: number) => {
        const cartData = await updateUserCart(bookId, quantity);

        dispatch(setCart(cartData));
        setContextCart(cartData);
    };

    // ------------------------------
    // ⭐ REMOVE ITEMS
    // ------------------------------
    const removeItems = async (bookIds: number[]) => {
        const cartData = await removeUserCart(bookIds);

        dispatch(setCart(cartData));
        setContextCart(cartData);
    };

    // ------------------------------
    // ⭐ CLEAR CART
    // ------------------------------
    const clearCart = async () => {
        await clearUserCart();
        dispatch(clearCartState());
        setContextCart({ items: [], totalAmount: 0 }); // sync context
    };

    return {
        refresh,
        addToCart,
        updateQuantity,
        removeItems,
        clearCart,
    };
};
