"use client";

import React, { useEffect, useState } from "react";
import SingleOrder from "./SingleOrder";
import { getUserOrders } from "@/services/userService";

const Orders = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Hàm map API → UI cũ
    const mapOrderResponse = (o: any) => {
        const title = o.orderItemUserSummaryDtoList
            ?.map((i: any) => `${i.bookTitleSnapshot} (x${i.quantity})`)
            .join(", ");

        return {
            ...o,
            orderId: o.orderCode,             // UI cũ đang dùng orderId
            title: title,                      // UI cũ đang dùng title
            total: o.totalAmount,              // UI cũ đang dùng total
        };
    };

    useEffect(() => {
        async function fetchOrders() {
            try {
                const res = await getUserOrders();
                console.log("raw-data", res);

                // Convert từng order sang format UI cũ
                const mappedOrders = res.map(mapOrderResponse);

                setOrders(mappedOrders);
            } catch (err) {
                console.log("Fetch order failed:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, []);

    if (loading) {
        return <p className="p-5">Loading...</p>;
    }

    return (
        <>
            <div className="w-full overflow-x-auto">
                <div className="min-w-[770px]">
                    {orders.length > 0 && (
                        <div className="items-center justify-between py-4.5 px-7.5 hidden md:flex ">
                            <div className="min-w-[111px]">
                                <p className="text-custom-sm text-dark">Order</p>
                            </div>
                            <div className="min-w-[175px]">
                                <p className="text-custom-sm text-dark">Date</p>
                            </div>

                            <div className="min-w-[128px]">
                                <p className="text-custom-sm text-dark">Status</p>
                            </div>

                            <div className="min-w-[213px]">
                                <p className="text-custom-sm text-dark">Title</p>
                            </div>

                            <div className="min-w-[113px]">
                                <p className="text-custom-sm text-dark">Total</p>
                            </div>

                            <div className="min-w-[113px]">
                                <p className="text-custom-sm text-dark">Action</p>
                            </div>
                        </div>
                    )}

                    {orders.length > 0 ? (
                        orders.map((orderItem, key) => (
                            <SingleOrder key={key} orderItem={orderItem} smallView={false} />
                        ))
                    ) : (
                        <p className="py-9.5 px-4 sm:px-7.5 xl:px-10">
                            You don&apos;t have any orders!
                        </p>
                    )}
                </div>

                {/* mobile */}
                {orders.length > 0 &&
                    orders.map((orderItem, key) => (
                        <SingleOrder key={key} orderItem={orderItem} smallView={true} />
                    ))}
            </div>
        </>
    );
};

export default Orders;
