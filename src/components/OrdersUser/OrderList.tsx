"use client";

import React, {useEffect, useState} from "react";
import Image from "next/image";
import Breadcrumb from "@/components/Common/Breadcrumb";
import {Modal, notification, Pagination, Popconfirm} from "antd";
import {cancelOrderApi, getUserOrders} from "@/services/userService";
import {OrderStatusDropdown} from "@/components/OrdersUser/OrderStatusDropdown";
import {useRouter} from "next/navigation";
import QRCode from "qrcode";
import { QRCodeCanvas } from "qrcode.react";
import {getOrderId, payAgain} from "@/services/orderService";

// ==============================
// 🔵 STATUS UI MAPPING
// ==============================
const STATUS_LABEL: Record<string, string> = {
    PENDING: "Chờ xác nhận",
    PENDING_PAYMENT: "Chờ xác nhận thanh toán",
    PAID: "Đã thanh toán",
    SHIPPING: "Đang giao hàng",
    COMPLETED: "Hoàn tất",
    CANCELLED: "Đã hủy",
};

const STATUS_STYLES: Record<string, string> = {
    PENDING: "text-yellow-600 border-yellow-400 bg-yellow-50",
    PENDING_PAYMENT: "text-purple-600 border-purple-400 bg-purple-50", // ⭐ MỚI
    PAID: "text-blue-600 border-blue-400 bg-blue-50",
    SHIPPING: "text-orange-600 border-orange-400 bg-orange-50",
    COMPLETED: "text-green-600 border-green-400 bg-green-50",
    CANCELLED: "text-red-600 border-red-400 bg-red-50",
};

// ==============================
// 🔵 Badge Component
// ==============================
const Badge = ({ status }: { status: string }) => (
    <span
        className={`px-3 py-1 text-xs font-semibold rounded-full border ${STATUS_STYLES[status]}`}
    >
    {STATUS_LABEL[status]}
  </span>
);

// ==============================
// 🔵 MAIN
// ==============================
const OrdersList = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
    const [orderToCancel, setOrderToCancel] = useState<number | null>(null);
    const [detailModalOpen, setDetailModalOpen] = useState(false);

    const [statusFilter, setStatusFilter] = useState("");
    const [api, contextHolder] = notification.useNotification();
    const  router = useRouter();
    const [payAgainModalOpen, setPayAgainModalOpen] = useState(false);
    const [payAgainQr, setPayAgainQr] = useState<string | null>(null);
    const [payAgainOrder, setPayAgainOrder] = useState<any>(null);
    const [payAgainQrImg, setPayAgainQrImg] = useState<string | null>(null);
    const [payAgainLoading, setPayAgainLoading] = useState(false);

    // ==============================
    // 🔵 Fetch Orders
    // ==============================
    const fetchOrders = async () => {
        try {
            setLoading(true);
            const res = await getUserOrders(statusFilter);
            const mapped = res.map((o: any) => ({
                ...o,
                createdAt: o.createdAt?.replace("T", " ").slice(0, 19),
                images: o.items.flatMap((i: any) => i.images || []),
            }));

            setOrders(mapped);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [statusFilter]);

    const handlePayAgain = async (order: any) => {
        try {
            setPayAgainLoading(true);

            const res = await payAgain(order.id);
            console.log("PayAgain response:", res);

            // ✅ PHẢI await
            const qrImg = QRCode.toDataURL(res.qrCode, {
                width: 300,
                margin: 2,
            });

            setPayAgainOrder(res.orderDto ?? order);
            setPayAgainQr(res.qrCode);
            setPayAgainQrImg(qrImg);
            setPayAgainModalOpen(true);
        } catch (e: any) {
            api.error({
                title: "Không thể thanh toán lại",
                description: e?.response?.data?.message || "Vui lòng thử lại",
            });
        } finally {
            setPayAgainLoading(false);
        }
    };

    useEffect(() => {
        if (!payAgainOrder || !payAgainModalOpen) return;

        let retry = 0;

        const interval = setInterval(async () => {
            try {
                retry++;

                const updated = await getOrderId(payAgainOrder.id);

                console.log("Polling order status:", updated.status);

                if (updated.status === "PAID") {
                    clearInterval(interval);

                    setPayAgainModalOpen(false);
                    setPayAgainOrder(null);
                    setPayAgainQr(null);

                    await fetchOrders(); // 🔥 reload list

                    api.success({
                        title: "Thanh toán thành công 🎉",
                        description: "Đơn hàng đã được xác nhận",
                    });
                }

                // ⛔ timeout an toàn
                if (retry >= 40) {
                    clearInterval(interval);
                }
            } catch (err) {
                console.error("Polling error", err);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [payAgainOrder, payAgainModalOpen]);

    // ==============================
    // 🔵 Cancel Order Handler
    // ==============================
    const handleCancel = async (id: number) => {
        try {
            const res = await cancelOrderApi(id);
            api.success({ title: "Hủy đơn hàng thành công!", description: res.message });
            fetchOrders();
        } catch (e: any) {
            api.error({
                title: "Hủy đơn thất bại!",
                description: e?.response?.data?.message,
            });
        }
    };

    // Pagination slice
    const pageSize = 10;
    const paginatedData = orders.slice((page - 1) * pageSize, page * pageSize);

    return (
        <>
            {contextHolder}
            <Breadcrumb title="Đơn hàng của tôi" pages={["Orders"]} />

            <section className="py-20 bg-gray-2">
                <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">

                    {/* FILTER */}
                    <div className="mb-6">
                        <OrderStatusDropdown
                            value={statusFilter}
                            onChange={(v: string) => {
                                setPage(1);
                                setStatusFilter(v);
                            }}
                        />
                    </div>

                    {/* GRID LIST */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Loading */}
                        {loading && (
                            <p className="text-center col-span-full py-10 text-gray-500">
                                Đang tải đơn hàng...
                            </p>
                        )}

                        {/* No Data */}
                        {!loading && paginatedData.length === 0 && (
                            <p className="text-center col-span-full py-10 text-grayCustom-5">
                                Không có đơn hàng nào.
                            </p>
                        )}

                        {/* Order Items */}
                        {!loading &&
                            paginatedData.map((order) => (
                                <div
                                    key={order.id}
                                    className="bg-white border rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                                >
                                    {/* HEADER */}
                                    <div className="flex justify-between items-center border-b px-5 py-4 bg-gray-50 rounded-t-xl">
                                        <div>
                                            <p className="text-sm text-gray-600">
                                                Mã đơn:{" "}
                                                <span className="font-semibold text-blue-600">
                          #{order.orderCode}
                        </span>
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                Ngày đặt: {order.createdAt}
                                            </p>
                                        </div>

                                        <Badge status={order.status} />
                                    </div>

                                    {/* BODY */}
                                    <div className="px-5 py-4">
                                        <p className="text-xs text-gray-400 italic">
                                            ({order.items.length} sản phẩm)
                                        </p>
                                    </div>

                                    {/* FOOTER */}
                                    <div className="flex justify-between items-center border-t px-5 py-4 bg-gray-50 rounded-b-xl">
                                        <p className="text-sm">
                                            Tổng tiền:{" "}
                                            <span className="font-semibold text-red-600 text-lg">
                        {order.totalAmount.toLocaleString()} đ
                      </span>
                                        </p>

                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => {
                                                    setSelectedOrder(order);
                                                    setDetailModalOpen(true);
                                                }}
                                                className="px-4 py-2 rounded-lg border text-sm hover:bg-gray-100 transition"
                                            >
                                                Xem chi tiết
                                            </button>

                                            {(order.status === "PENDING" || order.status === "PENDING_PAYMENT") && (
                                                <button
                                                    onClick={() => {
                                                        setOrderToCancel(order.id);
                                                        setConfirmCancelOpen(true);
                                                    }}
                                                    className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition"
                                                >
                                                    Hủy đơn
                                                </button>
                                            )}
                                            {order.status === "PENDING_PAYMENT" && (
                                                <button
                                                    disabled={payAgainLoading}
                                                    onClick={() => handlePayAgain(order)}
                                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition"
                                                >
                                                    {payAgainLoading ? "Đang tạo QR..." : "Thanh toán lại"}
                                                </button>

                                            )}

                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>

                    {/* PAGINATION */}
                    <div className="flex justify-center mt-10">
                        <Pagination
                            current={page}
                            pageSize={pageSize}
                            total={orders.length}
                            onChange={(p) => setPage(p)}
                            showSizeChanger={false}
                        />
                    </div>
                </div>
            </section>

            {/* ============ ORDER DETAIL MODAL ============ */}
            <Modal
                open={detailModalOpen}
                onCancel={() => setDetailModalOpen(false)}
                footer={null}
                centered
                style={{ top: 60 }}
                width={650}
            >
                {selectedOrder && (
                    <div className="bg-white rounded-xl overflow-hidden">
                        {/* HEADER */}
                        <div className="bg-blue-50 px-6 py-4 border-b border-gray-2">
                            <h2 className="text-xl font-semibold text-blue-700">
                                Chi tiết đơn hàng #{selectedOrder.orderCode?.slice(-7)}
                            </h2>
                            <p className="text-sm text-gray-600 mt-1">
                                Ngày đặt: {selectedOrder.createdAt}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                                Địa chỉ ship: {selectedOrder.shippingAddress}
                            </p>
                        </div>

                        {/* BODY */}
                        {/* BODY */}
                        <div className="px-6 py-5 space-y-6">

                            {/* STATUS + TOTAL CARD */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-xl border bg-gray-50">

                                {/* STATUS */}
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Trạng thái đơn hàng</p>
                                    <Badge status={selectedOrder.status} />
                                </div>

                                {/* TOTAL */}
                                <div className="text-right">
                                    <p className="text-xs text-gray-500 mb-1">Tổng tiền</p>
                                    <p className="text-xl font-bold text-red-600">
                                        {selectedOrder.totalAmount.toLocaleString()} đ
                                    </p>
                                </div>
                            </div>

                            {/* ITEMS */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                                    Sản phẩm ({selectedOrder.items.length})
                                </h3>

                                <div
                                    className="space-y-4 overflow-y-auto pr-2"
                                    style={{ maxHeight: "240px" }}
                                >
                                    {selectedOrder.items.map((item: any) => (
                                        <div
                                            key={item.id}
                                            className="flex gap-4 p-4 border border-gray-200 rounded-xl hover:shadow transition"
                                        >
                                            <Image
                                                src={item.images?.[0] || "/images/book-default.jpg"}
                                                width={80}
                                                height={80}
                                                alt="product"
                                                className="rounded-lg object-cover border"
                                            />

                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-800">
                                                    {item.bookTitle}
                                                </p>

                                                <div className="mt-1 text-sm text-gray-500 space-y-1">
                                                    <p>Số lượng: {item.quantity}</p>
                                                    <p>Giá: {item.price.toLocaleString()} đ</p>
                                                    <p className="font-semibold text-gray-700">
                                                        Thành tiền: {item.total.toLocaleString()} đ
                                                    </p>
                                                </div>

                                                {/* REVIEW */}
                                                {selectedOrder.status === "COMPLETED" && (
                                                    <div className="mt-3">
                                                        {!item.reviewed ? (
                                                            <button
                                                                onClick={() =>
                                                                    router.push(`/my-reviews/write/${item.id}`)
                                                                }
                                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700 transition"
                                                            >
                                                                Viết đánh giá
                                                            </button>
                                                        ) : (
                                                            <span className="inline-block px-3 py-1 text-xs bg-green-100 text-green-700 border border-green-300 rounded-md">
                    Đã đánh giá
                  </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* FOOTER */}
                        {(selectedOrder.status === "PENDING" ||
                            selectedOrder.status === "PENDING_PAYMENT") && (
                            <div className="bg-gray-50 px-6 py-4 border-t flex flex-col sm:flex-row sm:justify-end gap-3">

                                <Popconfirm
                                    title="Xác nhận hủy đơn hàng"
                                    description="Hành động này không thể hoàn tác."
                                    okText="Đồng ý"
                                    cancelText="Không"
                                    placement="topRight"
                                    onConfirm={async () => {
                                        await handleCancel(selectedOrder.id);
                                        setDetailModalOpen(false);
                                    }}
                                >
                                    <button className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm">
                                        Hủy đơn hàng
                                    </button>
                                </Popconfirm>

                                {selectedOrder.status === "PENDING_PAYMENT" && (
                                    <button
                                        onClick={() => {
                                            setDetailModalOpen(false);
                                            handlePayAgain(selectedOrder);
                                        }}
                                        className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-semibold"
                                    >
                                        Thanh toán lại
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </Modal>

            {/* ============ CONFIRM CANCEL MODAL ============ */}
            <Modal
                open={confirmCancelOpen}
                onCancel={() => setConfirmCancelOpen(false)}
                footer={null}
                centered
                width={380}
            >
                <div className="text-center py-3">
                    <h3 className="text-lg font-semibold text-gray-800">Xác nhận hủy đơn hàng</h3>

                    <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                        Bạn có chắc chắn muốn hủy đơn hàng này?
                        <br />
                        Hành động này không thể hoàn tác.
                    </p>

                    <div className="flex justify-center gap-3 mt-5">
                        <button
                            onClick={() => setConfirmCancelOpen(false)}
                            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition text-sm"
                        >
                            Không
                        </button>

                        <button
                            onClick={async () => {
                                if (orderToCancel) {
                                    await handleCancel(orderToCancel);
                                    setConfirmCancelOpen(false);
                                }
                            }}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-sm"
                        >
                            Đồng ý
                        </button>
                    </div>
                </div>
            </Modal>
            <Modal
                open={payAgainModalOpen}
                onCancel={() => setPayAgainModalOpen(false)}
                footer={null}
                centered={false}
                className="payagain-modal"
                width={420}
                style={{ top: 200 }}
            >
                {payAgainOrder && payAgainQr && (
                    <div className="payagain-content">
                        <QRCodeCanvas
                            value={payAgainQr}
                            size={240}
                            bgColor="#ffffff"
                            fgColor="#000000"
                            level="M"
                            includeMargin
                        />

                        <p className="mt-3 text-sm text-gray-600">
                            Quét mã QR để thanh toán
                        </p>

                        <p className="mt-2 font-semibold text-blue-600">
                            {payAgainOrder.orderCode}
                        </p>

                        <p className="mt-1 text-gray-700">
                            Số tiền:{" "}
                            <span className="font-bold text-red-600">
          {payAgainOrder.totalAmount.toLocaleString()} đ
        </span>
                        </p>
                    </div>
                )}
            </Modal>

        </>
    );
};

export default OrdersList;
