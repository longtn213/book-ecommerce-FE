"use client";

import {AppDispatch, useAppSelector} from "@/redux/store";
import React from "react";
import {clearCoupon} from "@/redux/features/couponSlice";
import {useDispatch} from "react-redux";
import {Trash2Icon} from "lucide-react";

const OrderSummary = () => {
    const dispatch = useDispatch<AppDispatch>();

    const cartItems = useAppSelector((state) => state.cartReducer.items);
    const totalAmount = useAppSelector((state) => state.cartReducer.totalAmount);

    const { discountAmount, code } = useAppSelector(
        (state) => state.couponSliceReducer
    );

    const finalAmount = totalAmount - discountAmount;

    return (
        <div className="lg:max-w-[455px] w-full">
            <div className="bg-white shadow-1 rounded-[10px]">
                <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
                    <h3 className="font-medium text-xl text-dark">Tóm tắt đơn hàng</h3>
                </div>

                <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">

                    {/* HEADER */}
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                        <h4 className="font-medium text-dark">Sản phẩm</h4>
                        <h4 className="font-medium text-dark">Tổng phụ</h4>
                    </div>

                    {/* LIST SẢN PHẨM */}
                    {cartItems.map((item) => (
                        <div
                            key={item.bookId}
                            className="flex items-center justify-between py-5 border-b border-gray-3"
                        >
                            <p>{item.title}</p>
                            <p>{(item.unitPriceSnapshot * item.quantity).toLocaleString()} đ</p>
                        </div>
                    ))}

                    {/* TOTAL */}
                    <div className="flex items-center justify-between pt-5">
                        <p className="font-medium text-lg">Tổng</p>
                        <p className="font-medium text-lg">{totalAmount.toLocaleString()} đ</p>
                    </div>

                    {/* DISCOUNT */}
                    {discountAmount > 0 && (
                        <div className="flex items-center justify-between pt-3 text-green-600">
                            <p className="flex items-center gap-2">
                                Giảm giá ({code})
                                <button
                                    onClick={() => dispatch(clearCoupon())}
                                    className="text-red-500 underline text-sm hover:text-red-600"
                                >
                                    <Trash2Icon/>
                                </button>
                            </p>

                            <p>-{discountAmount.toLocaleString()} đ</p>
                        </div>
                    )}

                    {/* FINAL */}
                    <div className="flex items-center justify-between pt-5">
                        <p className="font-semibold text-xl text-dark">Tổng</p>
                        <p className="font-semibold text-xl text-dark">
                            {finalAmount.toLocaleString()} đ
                        </p>
                    </div>

                    <button className="w-full bg-blue text-white py-3 rounded-md mt-6 hover:bg-blue-dark">
                        Tiếp tục thanh toán
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
