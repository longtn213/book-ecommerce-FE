import { useAppSelector } from "@/redux/store";
import React from "react";

const OrderSummary = () => {
    const cartItems = useAppSelector((state) => state.cartReducer.items);
    const totalAmount = useAppSelector((state) => state.cartReducer.totalAmount);

    return (
        <div className="lg:max-w-[455px] w-full">
            {/* Box wrapper */}
            <div className="bg-white shadow-1 rounded-[10px]">
                <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
                    <h3 className="font-medium text-xl text-dark">Order Summary</h3>
                </div>

                <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
                    {/* Title */}
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                        <h4 className="font-medium text-dark">Product</h4>
                        <h4 className="font-medium text-dark text-right">Subtotal</h4>
                    </div>

                    {/* Item list */}
                    {cartItems.map((item) => (
                        <div
                            key={item.bookId}
                            className="flex items-center justify-between py-5 border-b border-gray-3"
                        >
                            <p className="text-dark">{item.title}</p>
                            <p className="text-dark text-right">
                                {(item.unitPriceSnapshot * item.quantity).toLocaleString()} đ
                            </p>
                        </div>
                    ))}

                    {/* Total */}
                    <div className="flex items-center justify-between pt-5">
                        <p className="font-medium text-lg text-dark">Total</p>
                        <p className="font-medium text-lg text-dark text-right">
                            {totalAmount.toLocaleString()} đ
                        </p>
                    </div>

                    {/* Checkout Button */}
                    <button
                        type="submit"
                        className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
                    >Tiếp tục thanh toán
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
