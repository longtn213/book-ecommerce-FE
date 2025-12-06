"use client";

import React, {useEffect, useState} from "react";
import {Table} from "antd";
import {getUserOrders} from "@/services/userService";
import {Actions, Badge} from "@/components/Orders/SingleOrder";

const Orders = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const res = await getUserOrders();

            const mapped = res.map((o: any) => ({
                key: o.id,
                id: o.id,
                orderCode: o.orderCode,
                createdAt: o.createdAt?.slice(0, 19).replace("T", " "),
                status: o.status,
                totalAmount: o.totalAmount,
                raw: o,

                // ⭐ FIX: lấy đúng danh sách items từ API
                title: o.items
                    ?.map((i: any) => `${i.bookTitle} (x${i.quantity})`)
                    .join(", "),
            }));

            setOrders(mapped);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const columns: any[] = [
        {
            title: "Mã đơn",
            dataIndex: "orderCode",
            render: (code: string) => (
                <span className="font-semibold text-blue-dark whitespace-nowrap">
            #{code}
        </span>
            ),
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            width: 150,
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            width: 150,
            render: (status) => <Badge status={status} />
        },
        {
            title: "Sách",
            dataIndex: "title",
            width: 350,
            render: (t: string) => (
                <div className="whitespace-pre-line break-words text-gray-7 leading-relaxed">
                    {t}
                </div>
            ),
        },
        {
            title: "Tổng tiền",
            dataIndex: "totalAmount",
            width: 130,
            render: (amount: number) => (
                <span className="font-bold text-gray-7">
                    {amount.toLocaleString()} đ
                </span>
            ),
        },
        {
            title: "Thao tác",
            dataIndex: "action",
            width: 100,
            fixed: "right",
            render: (_, record) => (
                <Actions orderItem={record} refreshOrders={fetchOrders} />
            )

        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={orders}
            loading={loading}
            pagination={false}
            scroll={{ y: 500 }}
            bordered
            sticky
        />
    );
};

export default Orders;
