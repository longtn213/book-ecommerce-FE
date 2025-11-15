import React, { useState } from "react";
import OrderActions from "./OrderActions";
import OrderModal from "./OrderModal";
import CancelConfirm from "@/components/Orders/CancelConfirm";
import {notification} from "antd";
import {cancelOrderApi} from "@/services/userService";

const statusBadge: any = {
    COMPLETED: {
        label: "Hoàn thành",
        icon: "✔️",
        class:
            "bg-gradient-to-r from-green-50 to-green-100 text-green-700 border border-green-200 shadow-[0_2px_6px_rgba(0,128,0,0.15)] backdrop-blur-sm",
    },
    PAID: {
        label: "Đã thanh toán",
        icon: "💸",
        class:
            "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200 shadow-[0_2px_6px_rgba(0,0,255,0.15)] backdrop-blur-sm",
    },
    SHIPPING: {
        label: "Đang giao",
        icon: "🚚",
        class:
            "bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 border border-orange-200 shadow-[0_2px_6px_rgba(255,165,0,0.25)] backdrop-blur-sm",
    },
    CANCELLED: {
        label: "Đã hủy",
        icon: "⛔",
        class:
            "bg-gradient-to-r from-red-50 to-red-100 text-red-700 border border-red-200 shadow-[0_2px_6px_rgba(255,0,0,0.18)] backdrop-blur-sm",
    },
    PENDING: {
        label: "Chờ xử lý",
        icon: "⏳",
        class:
            "bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-700 border border-yellow-200 shadow-[0_2px_6px_rgba(255,255,0,0.25)] backdrop-blur-sm",
    },
};

const SingleOrder = ({ orderItem,refreshOrders }: any) => {
    const [showDetails, setShowDetails] = useState(false);
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    const handleConfirmCancel = async () => {
        try {
            const res = await cancelOrderApi(orderItem.id);

            api.success({
                message: res.message || "Hủy đơn hàng thành công!",
                description: `Bạn đã thao tác thành công`,
                placement: "topRight",
                style: {
                    background: "#f6f8ff",
                    border: "1px solid #3C50E0",
                    borderRadius: 10,
                    boxShadow: "0 4px 10px rgba(60,80,224,0.15)",
                },
            });


            setShowCancelConfirm(false);
            refreshOrders();
        } catch (err: any) {
            api.error(err?.response?.data?.message || "Hủy đơn thất bại!");
        }
    };

    const badge = statusBadge[orderItem.status] || {
        label: orderItem.status,
        class: "bg-gray-400 text-white",
        icon: "❔",
    };

    // === 🆕 LẤY DANH SÁCH ITEMS TỪ API ===
    const items = orderItem.raw?.items || [];

    // === 🆕 TẠO TITLE NGẮN ===
    const summaryTitle = items
        .map((i: any) => `${i.bookTitle} (x${i.quantity})`)
        .join(", ");

    return (
        <>
            {contextHolder}
            <tr className="border-b hover:bg-gray-50 transition">

                {/* Mã đơn */}
                <td className="py-4 px-4 text-blue-600 font-semibold">
                    #{orderItem.orderCode.slice(-7)}
                </td>

                {/* Ngày tạo */}
                <td className="py-4 px-4 text-gray-700">
                    {orderItem.createdAt?.slice(0, 19).replace("T", " ")}
                </td>

                {/* Badge */}
                <td className="py-4 px-4">
          <span
              className={`
              inline-flex items-center gap-2 
              px-4 py-1.5 rounded-full text-sm font-semibold 
              ${badge.class}
            `}
          >
            <span>{badge.icon}</span> {badge.label}
          </span>
                </td>

                {/* === 🆕 Title rút gọn theo items === */}
                <td className="py-4 px-4 max-w-[250px] whitespace-normal break-words text-gray-700">
                    {summaryTitle}
                </td>

                {/* Total */}
                <td className="py-4 px-4 font-bold text-gray-900 whitespace-nowrap">
                    {orderItem.totalAmount.toLocaleString()} đ
                </td>

                {/* Actions */}
                <td className="py-4 px-4">
                    <OrderActions
                        toggleDetails={() => setShowDetails(true)}
                        showCancel={orderItem.status === "PENDING"}
                        onCancel={() => setShowCancelConfirm(true)}
                    />
                </td>
            </tr>

            <OrderModal
                open={showDetails}
                onClose={() => setShowDetails(false)}
                order={orderItem}
            />
            {/* POPUP HỦY */}
            <CancelConfirm
                open={showCancelConfirm}
                onConfirm={handleConfirmCancel}
                onClose={() => setShowCancelConfirm(false)}
            />
        </>
    );
};

export default SingleOrder;
