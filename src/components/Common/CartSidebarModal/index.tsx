"use client";
import React, { useEffect } from "react";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";
import { useAppSelector } from "@/redux/store";
import { useCart } from "@/hook/useCart";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import Link from "next/link";

const CartSidebarModal = () => {
    const { isCartModalOpen, closeCartModal } = useCartModalContext();

    const cartItems = useAppSelector((state) => state.cartReducer.items);
    const totalAmount = useAppSelector((state) => state.cartReducer.totalAmount);
    const { refresh } = useCart();

    useEffect(() => {
        if (isCartModalOpen) refresh();
    }, [isCartModalOpen]);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: any) => {
            if (!e.target.closest(".cart-modal-content")) closeCartModal();
        };

        if (isCartModalOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isCartModalOpen]);

    return (
        <div
            className={`fixed inset-0 z-[99999] bg-black/50 backdrop-blur-sm transition-all duration-300 
      ${isCartModalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        >
            <div
                className={`fixed top-0 right-0 h-full w-[95%] sm:w-[430px] md:w-[480px] 
        bg-white shadow-2xl cart-modal-content transition-transform duration-300 
        ${isCartModalOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* HEADER */}
                <div className="sticky top-0 z-20 bg-white border-b p-5 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">Giỏ hàng</h2>

                    <button
                        onClick={closeCartModal}
                        className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100"
                    >
                        <svg
                            className="fill-current"
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12.5379 11.2121C12.1718 10.846 11.5782 10.846 11.212 11.2121C10.8459 11.5782 10.8459 12.1718 11.212 12.5379L13.6741 15L11.2121 17.4621C10.846 17.8282 10.846 18.4218 11.2121 18.7879C11.5782 19.154 12.1718 19.154 12.5379 18.7879L15 16.3258L17.462 18.7879C17.8281 19.154 18.4217 19.154 18.7878 18.7879C19.154 18.4218 19.154 17.8282 18.7878 17.462L16.3258 15L18.7879 12.5379C19.154 12.1718 19.154 11.5782 18.7879 11.2121C18.4218 10.846 17.8282 10.846 17.462 11.2121L15 13.6742L12.5379 11.2121Z"
                                fill=""
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M15 1.5625C7.57867 1.5625 1.5625 7.57867 1.5625 15C1.5625 22.4213 7.57867 28.4375 15 28.4375C22.4213 28.4375 28.4375 22.4213 28.4375 15C28.4375 7.57867 22.4213 1.5625 15 1.5625ZM3.4375 15C3.4375 8.61421 8.61421 3.4375 15 3.4375C21.3858 3.4375 26.5625 8.61421 26.5625 15C26.5625 21.3858 21.3858 26.5625 15 26.5625C8.61421 26.5625 3.4375 21.3858 3.4375 15Z"
                                fill=""
                            />
                        </svg>
                    </button>
                </div>

                {/* BODY */}
                <div className="px-5 py-6 overflow-y-auto h-[calc(100vh-200px)] no-scrollbar">
                    {cartItems.length > 0 ? (
                        <div className="flex flex-col gap-4">
                            {cartItems.map((item) => (
                                <CartItem key={item.bookId} item={item} />
                            ))}
                        </div>
                    ) : (
                        <EmptyCart />
                    )}
                </div>

                {/* FOOTER */}
                <div className="sticky bottom-0 bg-white border-t p-5">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-lg font-medium text-gray-700">Tổng tiền:</p>
                        <p className="text-lg font-semibold text-gray-900">
                            {totalAmount.toLocaleString()} đ
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <Link
                            href="/cart"
                            onClick={closeCartModal}
                            className="w-1/2 py-3 rounded-lg font-medium bg-gray-800 text-white hover:bg-gray-900 text-center"
                        >
                            Xem giỏ hàng
                        </Link>

                        <Link
                            href="/checkout"
                            onClick={closeCartModal}
                            className="w-1/2 py-3 rounded-lg font-medium bg-blue-600 text-white hover:bg-blueCustom-dark text-center"
                        >
                            Thanh toán
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartSidebarModal;
