"use client";

import React, { useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useCart } from "@/hook/useCart";
import { checkout } from "@/services/orderService";
import { useAuthContext } from "@/context/AuthContext";
import { useDispatch } from "react-redux";
import { clearCoupon } from "@/redux/features/couponSlice";
import Discount from "../Cart/Discount";
import FreeShipProgress from "@/components/Common/FreeShipProgress";
import { BASE_SHIP_FEE, FREESHIP_MIN_AMOUNT } from "@/utils/helper";
import confetti from "canvas-confetti";

const Checkout = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const cartItems = useAppSelector((state) => state.cartReducer.items);
    const totalAmount = useAppSelector((state) => state.cartReducer.totalAmount);

    const { code: couponCodeApplied, discountAmount } = useAppSelector(
        (state) => state.couponSliceReducer
    );

    const { clearCart } = useCart();
    const { user } = useAuthContext();

    const [shippingAddress, setShippingAddress] = useState("");
    const [note, setNote] = useState("");

    // ⚠ State Lỗi
    const [shippingAddressError, setShippingAddressError] = useState("");

    // Modal state
    const [openSuccess, setOpenSuccess] = useState(false);
    const [createdOrderId, setCreatedOrderId] = useState<number | null>(null);

    // FreeShip logic
    const isFreeShip = totalAmount >= FREESHIP_MIN_AMOUNT;
    const shippingFee = isFreeShip ? 0 : BASE_SHIP_FEE;
    const finalTotal = totalAmount - (discountAmount || 0) + shippingFee;

    // Confetti
    const fireConfetti = () => {
        confetti({
            particleCount: 180,
            spread: 70,
            origin: { y: 0.6 },
            zIndex: 99999,
        });
    };

    // Handle Checkout
    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();

        // ------------------------------
        // 🔥 VALIDATION
        // ------------------------------
        let hasError = false;

        if (!shippingAddress.trim()) {
            setShippingAddressError("Vui lòng nhập địa chỉ giao hàng");
            hasError = true;
        }

        if (hasError) return;

        try {
            const body = {
                shippingAddress,
                items: cartItems.map((item) => ({
                    bookId: item.bookId,
                    quantity: item.quantity,
                })),
                couponCode: couponCodeApplied || "",
                note: note || "",
            };

            const res = await checkout(body);

            await clearCart();
            dispatch(clearCoupon());

            setCreatedOrderId(res.orderCode);
            setShippingAddress("");
            setNote("");
            setOpenSuccess(true);

            fireConfetti();

            setTimeout(() => {
                router.push("/my-account?tab=orders");
            }, 3000);

        } catch (error) {
            console.error(error);
            // bạn có thể thêm error UI nếu muốn
        }
    };

    if (!user) {
        return (
            <>
                <Breadcrumb title={"Thanh toán"} pages={["checkout"]} />
                <section className="bg-gray-100 py-20">
                    <div className="max-w-[650px] mx-auto px-4">
                        <div className="bg-white border border-gray-200 rounded-xl shadow-md p-10 text-center">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Bạn chưa đăng nhập
                            </h2>

                            <button
                                onClick={() => router.push("/signin")}
                                className="px-10 py-3 bg-blue text-white text-lg rounded-lg font-medium hover:bg-blue-dark transition"
                            >
                                Đăng nhập ngay
                            </button>
                        </div>
                    </div>
                </section>
            </>
        );
    }

    return (
        <>
            <Breadcrumb title={"Thanh toán"} pages={["checkout"]} />

            <section className="py-10 bg-gray-100">
                <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 px-4">
                    {/* FREESHIP BAR */}
                    <div className="lg:col-span-3">
                        <FreeShipProgress totalAmount={totalAmount} />
                    </div>

                    {/* LEFT */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* SHIPPING ADDRESS */}
                        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                            <h3 className="text-lg font-semibold mb-4">Địa chỉ giao hàng</h3>

                            <input
                                type="text"
                                placeholder="VD: 123 Đội Cấn, Ba Đình, Hà Nội"
                                value={shippingAddress}
                                onChange={(e) => {
                                    setShippingAddress(e.target.value);
                                    if (shippingAddressError) setShippingAddressError("");
                                }}
                                className={`w-full border rounded px-4 py-3 bg-gray-50 ${
                                    shippingAddressError ? "border-red" : ""
                                }`}
                            />

                            {/* ⭐ Lỗi dưới input */}
                            {shippingAddressError && (
                                <p className="text-sm text-red mt-2">{shippingAddressError}</p>
                            )}
                        </div>

                        {/* NOTE */}
                        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                            <h3 className="text-lg font-semibold mb-4">Ghi chú</h3>
                            <textarea
                                rows={5}
                                placeholder="Ghi chú thêm cho đơn hàng..."
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="w-full border rounded px-4 py-3 bg-gray-50"
                            ></textarea>
                        </div>

                        {/* COUPON */}
                        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                            <h3 className="text-lg font-semibold mb-4">Mã giảm giá</h3>

                            {couponCodeApplied ? (
                                <div className="flex justify-between items-center p-3 border rounded bg-green-50 border-green-300">
                                    <p className="font-medium text-green-700">{couponCodeApplied}</p>
                                    <button
                                        onClick={() => dispatch(clearCoupon())}
                                        className="text-sm text-red-600 hover:underline"
                                    >
                                        Xóa mã
                                    </button>
                                </div>
                            ) : (
                                <Discount />
                            )}
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                            <h3 className="text-lg font-semibold pb-4 border-b">Đơn hàng của bạn</h3>

                            {/* Items */}
                            <div className="divide-y">
                                {cartItems.map((item) => (
                                    <div key={item.bookId} className="py-4 flex justify-between">
                                        <p>{item.title} × {item.quantity}</p>
                                        <p className="font-medium">
                                            {(item.unitPriceSnapshot * item.quantity).toLocaleString()} đ
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Discount */}
                            {discountAmount > 0 && (
                                <div className="pt-4 mt-4 border-t flex justify-between text-green-700 font-medium">
                                    <p>Giảm giá:</p>
                                    <p>- {discountAmount.toLocaleString()} đ</p>
                                </div>
                            )}

                            {/* Ship */}
                            <div className="pt-4 mt-4 border-t flex justify-between text-gray-700">
                                <p>Phí vận chuyển:</p>
                                <p className={isFreeShip ? "text-green-600 font-semibold" : ""}>
                                    {isFreeShip ? "0đ (FREESHIP)" : `${shippingFee.toLocaleString()} đ`}
                                </p>
                            </div>

                            {/* Total */}
                            <div className="pt-4 mt-4 border-t flex justify-between">
                                <p className="text-lg font-semibold">Tổng thanh toán</p>
                                <p className="text-lg font-semibold text-blue">
                                    {finalTotal.toLocaleString()} đ
                                </p>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                className="w-full mt-6 py-3 bg-blue text-white text-lg rounded-md hover:bg-blue-dark"
                            >
                                Đặt hàng
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* SUCCESS MODAL */}
            {openSuccess && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
                    <div className="bg-white rounded-xl p-8 shadow-xl max-w-sm w-full text-center">
                        <h2 className="text-2xl font-semibold text-green-600 mb-3">
                            🎉 Đặt hàng thành công!
                        </h2>

                        <p className="text-gray-700 mb-4">
                            Mã đơn hàng: <strong>#{createdOrderId}</strong>
                        </p>

                        <p className="text-gray-500 mb-6">
                            Bạn sẽ được chuyển đến trang đơn hàng trong giây lát...
                        </p>

                        <button
                            onClick={() => router.push("/my-account?tab=orders")}
                            className="px-6 py-3 bg-blue text-white rounded-lg hover:bg-blue-dark"
                        >
                            Xem đơn hàng
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Checkout;
