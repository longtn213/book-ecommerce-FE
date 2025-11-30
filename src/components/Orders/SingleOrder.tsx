"use client";

import React, {useState} from "react";
import {notification} from "antd";
import OrderModal from "./OrderModal";
import CancelConfirm from "@/components/Orders/CancelConfirm";
import {cancelOrderApi} from "@/services/userService";
import {CloseCircleOutlined, EyeOutlined} from "@ant-design/icons";

const statusBadge: any = {
    COMPLETED: {
        label: "Hoàn thành",
        icon: "✔️",
        class:
            "text-green border border-green",
    },
    PAID: {
        label: "Đã thanh toán",
        icon: "💸",
        class:
            "text-blue border border-blue",
    },
    SHIPPING: {
        label: "Đang giao",
        icon: "🚚",
        class:
            "text-orange border border-orange",
    },
    CANCELLED: {
        label: "Đã hủy",
        icon: "⛔",
        class:
            "text-red border border-red",
    },
    PENDING: {
        label: "Chờ xử lý",
        icon: "⏳",
        class:
            "text-yellow border border-yellow",
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

    const handleCancel = async (orderId: number) => {
        try {
            const res = await cancelOrderApi(orderId);
            api.success({
                message:res.message || "Hủy đơn hàng thành công!",
            });
        } catch (e: any) {
            api.error({
                message: "Hủy đơn thất bại!",
                description: e?.response?.data?.message|| "Vui lòng thử lại.",
                placement: "topRight",
            });
        }
    };

    return (
        <>
            {contextHolder}

            <div className="flex items-center gap-3 justify-center">
                <EyeOutlined
                    className="cursor-pointer text-blue-dark text-lg"
                    onClick={() => setShowDetails(true)}
                />
                {orderItem.status === "PENDING" && (
                    <CloseCircleOutlined
                        className="cursor-pointer text-red-light text-lg"
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
