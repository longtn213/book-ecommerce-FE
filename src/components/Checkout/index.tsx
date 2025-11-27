"use client";

import React, {useState} from "react";
import Breadcrumb from "../Common/Breadcrumb";
import {useAppSelector} from "@/redux/store";
import {useRouter} from "next/navigation";
import {useCart} from "@/hook/useCart";
import {checkout} from "@/services/orderService";
import {useAuthContext} from "@/context/AuthContext";

const Checkout = () => {
    const router = useRouter();

    const cartItems = useAppSelector((state) => state.cartReducer.items);
    const totalAmount = useAppSelector((state) => state.cartReducer.totalAmount);
    const { clearCart } = useCart();
    const { user,requireLogin } = useAuthContext();

    const [shippingAddress, setShippingAddress] = useState("");
    const [note, setNote] = useState("");
    const [couponCode, setCouponCode] = useState("");

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!shippingAddress.trim()) {
            alert("Vui lòng nhập địa chỉ giao hàng");
            return;
        }

        try {
            const body = {
                shippingAddress,
                items: cartItems.map((item) => ({
                    bookId: item.bookId,
                    quantity: item.quantity,
                })),
                couponCode: couponCode || "",
                note: note || "",
            };

            const res = await checkout(body);

            await clearCart();
            router.push(`/checkout/success?orderId=${res.data.data.id}`);
        } catch (error) {
            console.error(error);
            alert("Đặt hàng thất bại!");
        }
    };
    if (!user) {
        return (
            <>
                <Breadcrumb title={"Checkout"} pages={["checkout"]} />
                <section className="bg-gray-100 py-20">
                    <div className="max-w-[650px] mx-auto px-4">
                        <div className="bg-white border border-gray-200 rounded-xl shadow-md p-10 text-center">

                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Bạn chưa đăng nhập
                            </h2>

                            <p className="text-gray-600 leading-relaxed mb-8">
                                Hãy đăng nhập để tiếp tục các thao tác của bạn.
                            </p>

                            <button
                                onClick={() => router.push("/signin")}
                                className="px-10 py-3 bg-blue text-white text-lg rounded-lg font-medium hover:bg-blue-dark transition"
                            >
                                Đăng nhập ngay
                            </button>

                            <p className="mt-6 text-sm text-gray-500">
                                Sau khi đăng nhập bạn sẽ được thấy các thông tin
                            </p>
                        </div>
                    </div>
                </section>
            </>

        );
    }



    return (
        <>
            <Breadcrumb title={"Checkout"} pages={["checkout"]} />

            <section className="py-10 bg-gray-100">
                <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 px-4">

                    {/* LEFT */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* SHIPPING ADDRESS */}
                        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                            <h3 className="text-lg font-semibold mb-4">Địa chỉ giao hàng</h3>
                            <input
                                type="text"
                                placeholder="VD: 123 Đội Cấn, Ba Đình, Hà Nội"
                                value={shippingAddress}
                                onChange={(e) => setShippingAddress(e.target.value)}
                                className="w-full border rounded px-4 py-3 bg-gray-50"
                            />
                        </div>

                        {/* COUPON */}
                        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                            <h3 className="text-lg font-semibold mb-4">Mã giảm giá</h3>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    placeholder="Nhập mã khuyến mãi"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    className="flex-1 border rounded px-4 py-3 bg-gray-50"
                                />
                                <button
                                    type="button"
                                    className="px-5 bg-blue text-white rounded-md hover:bg-blue-dark"
                                >
                                    Áp dụng
                                </button>
                            </div>
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
                    </div>

                    {/* RIGHT */}
                    <div className="space-y-6">

                        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                            <h3 className="text-lg font-semibold pb-4 border-b">Đơn hàng của bạn</h3>

                            {/* LIST */}
                            <div className="divide-y">
                                {cartItems.map((item) => (
                                    <div key={item.bookId} className="py-4 flex justify-between">
                                        <p className="text-gray-700">{item.title} × {item.quantity}</p>
                                        <p className="font-medium">
                                            {(item.unitPriceSnapshot * item.quantity).toLocaleString()} đ
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* TOTAL */}
                            <div className="pt-4 mt-4 border-t flex justify-between">
                                <p className="text-lg font-semibold">Tổng thanh toán</p>
                                <p className="text-lg font-semibold text-blue">
                                    {totalAmount.toLocaleString()} đ
                                </p>
                            </div>

                            {/* BUTTON */}
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
        </>
    );
};

export default Checkout;
