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
import { useRef, useState, useCallback } from "react";
import debounce from "lodash/debounce";

export const useCart = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { setCart: setContextCart } = useAuthContext();

    const [loadingMap, setLoadingMap] = useState<Record<number, boolean>>({});

    /* ===================================================
       LOAD CART (MEMOIZED)
    =================================================== */
    const refresh = useCallback(async () => {
        const cartData = await getUserCart();
        dispatch(setCart(cartData));
        setContextCart(cartData);
    }, [dispatch, setContextCart]);

    /* ======================
       ADD TO CART (NO DEBOUNCE)
    ======================= */
    const addToCart = async (bookId: number, quantity: number) => {
        setLoadingMap(prev => ({ ...prev, [bookId]: true }));

        const cartData = await addUserCart(bookId, quantity);

        dispatch(setCart(cartData));
        setContextCart(cartData);

        setLoadingMap(prev => ({ ...prev, [bookId]: false }));
    };


    /* ======================
       UPDATE QUANTITY (DEBOUNCE)
    ======================= */
    const updateQuantityDebounceRef = useRef(
        debounce(async (bookId: number, quantity: number) => {
            setLoadingMap(prev => ({ ...prev, [bookId]: true }));

            const cartData = await updateUserCart(bookId, quantity);

            dispatch(setCart(cartData));
            setContextCart(cartData);

            setLoadingMap(prev => ({ ...prev, [bookId]: false }));
        }, 300)
    ).current;

    const updateQuantity = (bookId: number, quantity: number) => {
        updateQuantityDebounceRef(bookId, quantity);
    };

    /* ===================================================
       REMOVE ITEM
    =================================================== */
    const removeItems = useCallback(async (bookIds: number[]) => {
        const cartData = await removeUserCart(bookIds);
        dispatch(setCart(cartData));
        setContextCart(cartData);
    }, [dispatch, setContextCart]);

    /* ===================================================
       CLEAR CART
    =================================================== */
    const clearCart = useCallback(async () => {
        await clearUserCart();
        dispatch(clearCartState());
        setContextCart({ items: [], totalAmount: 0 });
    }, [dispatch, setContextCart]);

    return {
        refresh,
        addToCart,
        updateQuantity,
        removeItems,
        clearCart,
        loadingMap,
    };
};
