"use client";

import React, { useEffect, useState } from "react";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { applyCoupon as applyCouponAction, clearCoupon } from "@/redux/features/couponSlice";
import { applyCoupon as applyCouponService } from "@/services/couponService";
import { useDispatch } from "react-redux";
import {MailWarning} from "lucide-react";

const Discount = () => {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const dispatch = useDispatch<AppDispatch>();

    const totalAmount = useAppSelector((state) => state.cartReducer.totalAmount);
    const { code: appliedCode } = useAppSelector(
        (state) => state.couponSliceReducer
    );

    // ❗ Xóa thông báo khi user gõ
    useEffect(() => {
        if (appliedCode && code.trim() === "") {
            setErrorMessage("");
            setSuccessMessage("");
        }
    }, [code, appliedCode]);

// 🟢 Auto re-apply coupon khi giỏ hàng thay đổi
    useEffect(() => {
        if (!appliedCode) return;

        const reApply = async () => {
            try {
                const data = await applyCouponService(appliedCode, totalAmount);

                dispatch(
                    applyCouponAction({
                        code: appliedCode,
                        discountAmount: data.discountAmount,
                    })
                );

            } catch (error: any) {

                // Lấy message đúng từ server
                const msg =
                    error?.response?.data?.message ||
                    "Mã giảm giá không còn hợp lệ";

                // Reset success message
                setSuccessMessage("");

                // Hiển thị thông báo lỗi đúng
                setErrorMessage(msg);

                // Clear coupon trong Redux
                dispatch(clearCoupon());

                // Mở input để user nhập lại mã
                setCode("");
            }
        };

        reApply();
    }, [totalAmount]);   // ❗ tuyệt đối không thêm appliedCode vào đây


    // 📌 APPLY USER INPUT
    const handleApplyCoupon = async (e: any) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        if (!code.trim()) {
            setErrorMessage("Vui lòng nhập mã giảm giá");
            return;
        }

        try {
            setLoading(true);

            const data = await applyCouponService(code, totalAmount);

            dispatch(
                applyCouponAction({
                    code,
                    discountAmount: data.discountAmount,
                })
            );

            setSuccessMessage("Áp dụng mã giảm giá thành công!");

        } catch (error: any) {
            const msg = error?.response?.data?.message || "Mã giảm giá không hợp lệ";

            // 🔥 Quan trọng: reset success
            setSuccessMessage("");

            // 🔥 Hiển thị đúng lỗi API
            setErrorMessage(msg);

            // 🔥 Xóa mã đã áp dụng (nếu có)
            dispatch(clearCoupon());

            // 🔥 Cho phép nhập lại mã mới
            setCode("");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="lg:max-w-[670px] w-full">
            <form onSubmit={handleApplyCoupon}>
                <div className="bg-white shadow-1 rounded-[10px]">
                    <div className="border-b border-gray-3 py-5 px-4 sm:px-5.5">
                        <h3>Bạn có mã giảm giá?</h3>
                    </div>

                    <div className="py-8 px-4 sm:px-8.5">
                        <div className="flex flex-wrap gap-4 xl:gap-5.5">

                            <div className="max-w-[426px] w-full">
                                <input
                                    type="text"
                                    placeholder="Nhập mã giảm giá"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    disabled={!!appliedCode}
                                    className={`rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 
            w-full py-2.5 px-5 outline-none duration-200
            ${appliedCode ? "opacity-60 cursor-not-allowed" : ""}
        `}
                                />
                            </div>


                            {!appliedCode ? (
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="inline-flex font-medium text-white bg-blue py-3 px-8 rounded-md hover:bg-blue-dark"
                                >
                                    {loading ? "Đang kiểm tra..." : "Áp dụng"}
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => {
                                        dispatch(clearCoupon());
                                        setCode("");
                                        setSuccessMessage("");
                                        setErrorMessage("");
                                    }}
                                    className="inline-flex font-medium text-white bg-red-500 py-3 px-8 rounded-md hover:bg-red-600"
                                >
                                    Xóa mã
                                </button>
                            )}
                        </div>

                        {/* LỖI */}
                        {errorMessage && (
                            <div className="mt-3 flex items-start gap-2 bg-red-50 border border-red text-red text-sm px-3 py-2 rounded-md">
                                <MailWarning/>
                                <span>{errorMessage}</span>
                            </div>
                        )}

                        {/* THÀNH CÔNG */}
                        {successMessage && (
                            <p className="text-green-600 text-sm mt-2">{successMessage}</p>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Discount;
