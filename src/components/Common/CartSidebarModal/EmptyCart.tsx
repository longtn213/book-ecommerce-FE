import React from "react";
import Link from "next/link";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";

const EmptyCart = () => {
    const { closeCartModal } = useCartModalContext();

    return (
        <div className="text-center py-10">
            <div className="mx-auto mb-5">
                <svg width="100" height="100" viewBox="0 0 100 100" className="text-gray-300 mx-auto">
                    <circle cx="50" cy="50" r="50" fill="#F3F4F6" />
                </svg>
            </div>

            <p className="text-gray-600 mb-6">Giỏ hàng của bạn đang trống!</p>

            <Link
                href="/shop"
                onClick={closeCartModal}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blueCustom-dark inline-block"
            >
                Tiếp tục mua sắm
            </Link>
        </div>
    );
};

export default EmptyCart;
