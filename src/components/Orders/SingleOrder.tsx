"use client";

import React, { useState } from "react";
import { notification } from "antd";
import OrderModal from "./OrderModal";
import CancelConfirm from "@/components/Orders/CancelConfirm";
import { cancelOrderApi } from "@/services/userService";
import { EyeOutlined, CloseCircleOutlined } from "@ant-design/icons";

const statusBadge: any = {
    COMPLETED: {
        label: "Hoàn thành",
        icon: "✔️",
        class:
            "bg-green-100 text-green-700 border border-green-300",
    },
    PAID: {
        label: "Đã thanh toán",
        icon: "💸",
        class:
            "bg-blue-100 text-blue-700 border border-blue-300",
    },
    SHIPPING: {
        label: "Đang giao",
        icon: "🚚",
        class:
            "bg-orange-100 text-orange-700 border border-orange-300",
    },
    CANCELLED: {
        label: "Đã hủy",
        icon: "⛔",
        class:
            "bg-red-100 text-red-700 border border-red-300",
    },
    PENDING: {
        label: "Chờ xử lý",
        icon: "⏳",
        class:
            "bg-yellow-100 text-yellow-700 border border-yellow-300",
    },
};

export const Badge = ({ status }: { status: string }) => {
    const badge = statusBadge[status] || statusBadge.PENDING;

    return (
        <span
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${badge.class}`}
        >
            {badge.icon} {badge.label}
        </span>
    );
};

export const Actions = ({ orderItem, refreshOrders }: any) => {
    const [showDetails, setShowDetails] = useState(false);
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    const handleCancel = async () => {
        try {
            const res = await cancelOrderApi(orderItem.id);
            api.success({ message: res.message || "Hủy đơn thành công!" });
            setShowCancelConfirm(false);
            refreshOrders();
        } catch (e: any) {
            api.error({ message: e?.response?.data?.message || "Lỗi hủy đơn" });
        }
    };

    return (
        <>
            {contextHolder}

            <div className="flex items-center gap-3 justify-center">
                <EyeOutlined
                    className="cursor-pointer text-blue-600 text-lg"
                    onClick={() => setShowDetails(true)}
                />
                {orderItem.status === "PENDING" && (
                    <CloseCircleOutlined
                        className="cursor-pointer text-red-500 text-lg"
                        onClick={() => setShowCancelConfirm(true)}
                    />
                )}
            </div>

            <OrderModal
                open={showDetails}
                onClose={() => setShowDetails(false)}
                order={orderItem}
            />

            <CancelConfirm
                open={showCancelConfirm}
                onConfirm={handleCancel}
                onClose={() => setShowCancelConfirm(false)}
            />
        </>
    );
};
