"use client";

import React, { useEffect, useState } from "react";
import { getUserOrders } from "@/services/userService";
import SingleOrder from "./SingleOrder";

const Orders = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const mapOrderResponse = (o: any) => {
        const title = o.orderItemUserSummaryDtoList
            ?.map((i: any) => `${i.bookTitleSnapshot} (x${i.quantity})`)
            .join(", ");

        return {
            id: o.id,   // ⭐ cần id để cancel
            orderCode: o.orderCode,
            createdAt: o.createdAt,
            status: o.status,
            paid: o.paid,
            title: title,
            totalAmount: o.totalAmount,
            raw: o
        };
    };

    // ⭐ TẠO HÀM FETCH ĐỂ DÙNG CHO REFRESH
    const fetchOrders = async () => {
        try {
            const res = await getUserOrders();
            const mapped = res.map(mapOrderResponse);
            setOrders(mapped);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) return <p className="p-5">Đang tải...</p>;

    return (
        <div className="w-full">
            <table className="w-full border-collapse bg-white shadow-sm rounded-lg table-auto">
            <thead>
                <tr className="bg-gray-100 text-left text-gray-700">
                    <th className="py-3 px-4 w-[90px]">Mã đơn</th>
                    <th className="py-3 px-4 w-[130px]">Ngày tạo</th>
                    <th className="py-3 px-4 w-[140px]">Trạng thái</th>
                    <th className="py-3 px-4 w-[260px]">Sách</th>
                    <th className="py-3 px-4 w-[120px]">Tổng tiền</th>
                    <th className="py-3 px-4 w-[80px]">Thao tác</th>
                </tr>
                </thead>

                <tbody>
                {orders.map((order, idx) => (
                    <SingleOrder
                        key={idx}
                        orderItem={order}
                        refreshOrders={fetchOrders}
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Orders;
