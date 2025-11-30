"use client";

import React from "react";
import { Card, Divider } from "antd";

const statusBadge: any = {
    COMPLETED: { label: "Hoàn thành", icon: "✔️", class: "badge badge-green" },
    PAID: { label: "Đã thanh toán", icon: "💸", class: "badge badge-blue" },
    SHIPPING: { label: "Đang giao", icon: "🚚", class: "badge badge-orange" },
    CANCELLED: { label: "Đã hủy", icon: "⛔", class: "badge badge-red" },
    PENDING: { label: "Chờ xử lý", icon: "⏳", class: "badge badge-yellow" },
};

const OrderDetails = ({ orderItem }: any) => {
    const badge = statusBadge[orderItem.status];
    const items = orderItem.raw?.items || [];

    return (
        <div className="space-y-4">

            {/* Section 1 */}
            <Card
                title="CHI TIẾT ĐƠN HÀNG"
                variant="borderless"
                className="shadow-sm rounded-xl p-2"
            >
                <div className="space-y-3 text-[15px]">
                    <p><b>Mã đơn:</b> <span></span> #{orderItem.orderCode}</p>
                    <p><b>Ngày tạo:</b> {orderItem.createdAt?.slice(0,19).replace("T"," ")}</p>

                    <div className="flex items-center gap-2">
                        <b>Trạng thái:</b>
                        <span className={badge.class}>{badge.icon} {badge.label}</span>
                    </div>

                    <p>
                        <b>Thanh toán:</b>{" "}
                        {!orderItem.paid ?
                            <span className="text-red-dark font-medium">Chưa thanh toán</span>
                            :
                            <span className="text-green-dark font-medium">Đã thanh toán</span>
                        }
                    </p>

                    <p>
                        <b>Tổng tiền:</b>{" "}
                        <span className="font-bold">{orderItem.totalAmount.toLocaleString()} đ</span>
                    </p>

                    <p>
                        <b>Địa chỉ giao hàng:</b>{" "}
                        {orderItem.raw?.shippingAddress}
                    </p>
                </div>
            </Card>

            {/* Section 2 */}
            <Card
                title="DANH SÁCH SẢN PHẨM"
                variant="borderless"
                className="shadow-sm rounded-xl p-2"
            >
                {items.map((i: any, idx: number) => (
                    <div key={i.id}>
                        <div className="flex justify-between py-2">
                            <div>
                                <p className="font-medium">{i.bookTitle}</p>
                                <p className="text-gray-5 text-sm">{i.price.toLocaleString()} đ × {i.quantity}</p>
                            </div>

                            <p className="font-semibold">{i.total.toLocaleString()} đ</p>
                        </div>

                        {idx < items.length - 1 && <Divider />}
                    </div>
                ))}
            </Card>

        </div>
    );
};

export default OrderDetails;
