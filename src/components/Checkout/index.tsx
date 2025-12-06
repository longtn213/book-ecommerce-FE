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
import {BASE_SHIP_FEE, FREESHIP_MIN_AMOUNT, generateOrderCode} from "@/utils/helper";
import confetti from "canvas-confetti";

const Checkout = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const cartItems = useAppSelector((state) => state.cartReducer.items);
    const totalAmount = useAppSelector((state) => state.cartReducer.totalAmount);

    const {
        code: couponCodeApplied,
        discountAmount,
    } = useAppSelector((state) => state.couponSliceReducer);

    const { clearCart } = useCart();
    const { user } = useAuthContext();

    const [shippingAddress, setShippingAddress] = useState("");
    const [note, setNote] = useState("");

    const [shippingAddressError, setShippingAddressError] = useState("");

    const [openSuccess, setOpenSuccess] = useState(false);
    const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);

    // FreeShip logic
    const isFreeShip = totalAmount >= FREESHIP_MIN_AMOUNT;
    const shippingFee = isFreeShip ? 0 : BASE_SHIP_FEE;
    const finalTotal = totalAmount - (discountAmount || 0) + shippingFee;
    const [paymentMethod, setPaymentMethod] = useState<"COD" | "ONLINE">("COD");
    const orderCode = generateOrderCode();

    const fireConfetti = () => {
        confetti({
            particleCount: 140,
            spread: 60,
            origin: { y: 0.6 },
        });
    };

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();

        let hasError = false;

        if (!shippingAddress.trim()) {
            setShippingAddressError("Vui lòng nhập địa chỉ giao hàng");
            hasError = true;
        }

        if (hasError) return;

        try {
            const body = {
                orderCode,
                shippingAddress,
                items: cartItems.map((item) => ({
                    bookId: item.bookId,
                    quantity: item.quantity,
                })),
                couponCode: couponCodeApplied || "",
                note: note || "",
                paymentMethod,
            };

            const res = await checkout(body);

            await clearCart();
            dispatch(clearCoupon());

            setCreatedOrderId(orderCode);
            setShippingAddress("");
            setNote("");
            setOpenSuccess(true);

            fireConfetti();

            setTimeout(() => {
                router.push("/my-orders");
            }, 2800);

        } catch (error) {
            console.error(error);
        }
    };

    // Nếu user chưa login
    if (!user) {
        return (
            <>
                <Breadcrumb title="Thanh toán" pages={["checkout"]} />
                <section className="bg-gray-100 py-20">
                    <div className="max-w-[650px] mx-auto px-4">
                        <div className="bg-white border rounded-xl shadow-lg p-10 text-center">
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                                Bạn chưa đăng nhập
                            </h2>

                            <button
                                onClick={() => router.push("/signin")}
                                className="px-10 py-3 bg-blue text-white text-lg rounded-lg font-medium hover:bg-blue-dark"
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
            <Breadcrumb title="Thanh toán" pages={["checkout"]} />

            <section className="py-10 bg-gray-100">
                <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 px-4">

                    {/* FREESHIP BAR */}
                    <div className="lg:col-span-3 mb-4">
                        <FreeShipProgress totalAmount={totalAmount} />
                    </div>

                    {/* LEFT */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* SHIPPING ADDRESS */}
                        <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
                            <h3 className="text-lg font-semibold mb-4">Địa chỉ giao hàng</h3>

                            <input
                                type="text"
                                placeholder="VD: 123 Đội Cấn, Ba Đình, Hà Nội"
                                value={shippingAddress}
                                onChange={(e) => {
                                    setShippingAddress(e.target.value);
                                    if (shippingAddressError) setShippingAddressError("");
                                }}
                                className={`w-full border rounded-lg px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-300 
                                    ${shippingAddressError ? "border-red-600" : "border-gray-300"}`}
                            />

                            {shippingAddressError && (
                                <p className="text-sm text-red-600 mt-2">{shippingAddressError}</p>
                            )}
                        </div>
                        {/* PAYMENT METHOD */}
                        <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
                            <h3 className="text-lg font-semibold mb-4">Phương thức thanh toán</h3>

                            <div className="space-y-3">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="COD"
                                        checked={paymentMethod === "COD"}
                                        onChange={() => setPaymentMethod("COD")}
                                    />
                                    <span>Thanh toán khi nhận hàng (COD)</span>
                                </label>

                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="ONLINE"
                                        checked={paymentMethod === "ONLINE"}
                                        onChange={() => setPaymentMethod("ONLINE")}
                                    />
                                    <span>Thanh toán Online (chuyển khoản)</span>
                                </label>
                            </div>
                        </div>
                        {paymentMethod === "ONLINE" && (
                            <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
                                <h3 className="text-lg font-semibold mb-4 text-green-600">Thanh toán qua QR</h3>

                                {/* QR code cho chuyển khoản */}
                                <div className="flex flex-col items-center">
                                    <img
                                        src={`https://img.vietqr.io/image/BIDV-4800677847-compact.png?amount=${finalTotal}&addInfo=${orderCode}`}
                                        alt="QR Code thanh toán"
                                        className="w-56 h-56 rounded-lg border shadow"
                                    />

                                    <p className="text-gray-600 mt-3 text-sm">
                                        Quét mã để thanh toán đúng với nội dung:
                                    </p>
                                    <p className="font-semibold text-blue-600 text-lg"> {orderCode} </p>

                                    <p className="text-sm mt-3 text-gray-500">
                                        Số tiền: <strong>{finalTotal.toLocaleString()}đ</strong>
                                    </p>

                                    <p className="text-xs text-gray-400 mt-2">
                                        *Sau khi thanh toán thành công, đơn hàng sẽ tự động được xác nhận.
                                    </p>
                                </div>
                            </div>
                        )}


                        {/* NOTE */}
                        <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
                            <h3 className="text-lg font-semibold mb-4">Ghi chú</h3>
                            <textarea
                                rows={5}
                                placeholder="Ghi chú thêm cho đơn hàng..."
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="w-full border rounded-lg px-4 py-3 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue/40"
                            />
                        </div>

                        {/* COUPON */}
                        <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
                            <h3 className="text-lg font-semibold mb-4">Mã giảm giá</h3>

                            {couponCodeApplied ? (
                                <div className="flex justify-between items-center p-3 border rounded-lg bg-green-50 border-green-300">
                                    <p className="font-semibold text-green-700">{couponCodeApplied}</p>
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

                    {/* RIGHT – ORDER SUMMARY */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
                            <h3 className="text-lg font-semibold pb-4 border-b">Đơn hàng của bạn</h3>

                            {/* Items */}
                            <div className="divide-y">
                                {cartItems.map((item) => (
                                    <div key={item.bookId} className="py-4 flex justify-between text-gray-700">
                                        <p className="w-2/3">
                                            {item.title} × {item.quantity}
                                        </p>
                                        <p className="font-medium">
                                            {(item.unitPriceSnapshot * item.quantity).toLocaleString()} đ
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {discountAmount > 0 && (
                                <div className="pt-4 mt-4 border-t flex justify-between text-green-700 font-medium">
                                    <p>Giảm giá:</p>
                                    <p>- {discountAmount.toLocaleString()} đ</p>
                                </div>
                            )}

                            <div className="pt-4 mt-4 border-t flex justify-between text-gray-700">
                                <p>Phí vận chuyển:</p>
                                <p className={isFreeShip ? "text-green-700 font-semibold" : ""}>
                                    {isFreeShip ? "0đ (FREESHIP)" : `${shippingFee.toLocaleString()} đ`}
                                </p>
                            </div>

                            <div className="pt-4 mt-4 border-t flex justify-between">
                                <p className="text-lg font-semibold">Tổng thanh toán</p>
                                <p className="text-lg font-bold text-blue-600">
                                    {finalTotal.toLocaleString()} đ
                                </p>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                className="w-full mt-6 py-3 bg-blue-600 text-white text-lg rounded-lg font-medium hover:bg-blueCustom-dark transition"
                            >
                                Đặt hàng
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* SUCCESS MODAL */}
            {openSuccess && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
                    <div className="bg-white rounded-xl p-8 shadow-2xl max-w-sm w-full text-center animate-fadeIn">
                        <h2 className="text-2xl font-bold text-green-700 mb-3">
                            🎉 Đặt hàng thành công!
                        </h2>

                        <p className="text-gray-600 mb-4">
                            Mã đơn hàng: <strong>#{createdOrderId}</strong>
                        </p>

                        <p className="text-gray-500 mb-6">
                            Bạn sẽ được chuyển tới trang đơn hàng trong giây lát...
                        </p>

                        <button
                            onClick={() => router.push("/my-orders")}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blueCustom-dark"
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
