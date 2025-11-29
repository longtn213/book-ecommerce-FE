"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Pagination } from "antd";
import { Actions, Badge } from "@/components/Orders/SingleOrder";
import {cancelOrderApi, getUserOrders} from "@/services/userService";
import { Modal, message } from "antd";
import { Eye, X } from "lucide-react";


const OrdersList = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const openDetailModal = (order: any) => {
        setSelectedOrder(order);
        setDetailModalOpen(true);
    };


    const fetchOrders = async () => {
        try {
            setLoading(true);
            const res = await getUserOrders();

            const mapped = res.map((o: any) => ({
                key: o.id,
                id: o.id,
                orderCode: o.orderCode,
                createdAt: o.createdAt?.slice(0, 19).replace("T", " "),
                shippingAddress:o.shippingAddress,
                status: o.status,
                totalAmount: o.totalAmount,
                items: o.items,
                images: o.items?.flatMap((i: any) => i.images) || [],
            }));

            setOrders(mapped);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleCancel = async (orderId: number) => {
        try {
            const res = await cancelOrderApi(orderId);
            message.success(res.message || "Hủy đơn hàng thành công!");
            fetchOrders(); // refresh list
        } catch (e: any) {
            message.error(e?.response?.data?.message || "Hủy đơn thất bại!");
        }
    };

    const paginatedData = orders.slice((page - 1) * pageSize, page * pageSize);

    return (
        <>
            <Breadcrumb title="Đơn hàng của tôi" pages={["Orders"]} />

            <section className="overflow-hidden py-20 bg-gray-2">
                <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">

                    <h2 className="text-dark text-2xl font-medium mb-7.5">
                        Đơn hàng của tôi
                    </h2>

                    <div className="bg-white rounded-[10px] shadow-1">
                        <div className="w-full overflow-x-auto">
                            <div className="min-w-[1170px]">

                                {/* HEADER */}
                                <div className="flex items-center border-b py-5.5 px-10 font-medium text-dark">

                                    <div className="min-w-[150px]">Mã đơn</div>
                                    <div className="min-w-[180px]">Ngày đặt</div>
                                    <div className="min-w-[150px]">Trạng thái</div>
                                    <div className="min-w-[390px]">Sản phẩm</div>
                                    <div className="min-w-[140px]">Tổng tiền</div>
                                    <div className="min-w-[120px] text-right">Thao tác</div>
                                </div>

                                {/* ROWS */}
                                {loading && (
                                    <p className="text-center py-10 text-gray-5">
                                        Đang tải đơn hàng...
                                    </p>
                                )}

                                {!loading && paginatedData.length === 0 && (
                                    <p className="text-center py-10 text-gray-5">
                                        Bạn chưa có đơn hàng nào.
                                    </p>
                                )}

                                {!loading &&
                                    paginatedData.map((order) => (
                                        <div
                                            key={order.id}
                                            className="flex items-center py-5.5 px-10 border-b last:border-none"
                                        >
                                            {/* Mã đơn */}
                                            <div className="min-w-[150px] font-semibold text-blue-dark">
                                                #{order.orderCode.slice(-7)}
                                            </div>

                                            {/* Ngày */}
                                            <div className="min-w-[180px] text-gray-6">
                                                {order.createdAt}
                                            </div>

                                            {/* Trạng thái */}
                                            <div className="min-w-[150px]">
                                                <Badge status={order.status} />
                                            </div>

                                            {/* Sản phẩm */}
                                            <div className="min-w-[390px]">
                                                <div className="flex items-center gap-3">

                                                    {/* Thumbnail */}
                                                    <Image
                                                        src={
                                                            order.images?.[0] ||
                                                            "/images/book-default.jpg"
                                                        }
                                                        width={50}
                                                        height={50}
                                                        alt="product"
                                                        className="rounded border object-cover"
                                                    />

                                                    <div className="flex-1 leading-tight">
                                                        <p className="text-sm text-dark line-clamp-2">
                                                            {order.items
                                                                .map(
                                                                    (i: any) =>
                                                                        `${i.bookTitle} (x${i.quantity})`
                                                                )
                                                                .join(", ")}
                                                        </p>

                                                        {/* Mini gallery */}
                                                        {order.images.length > 1 && (
                                                            <div className="flex gap-1 mt-1">
                                                                {order.images
                                                                    .slice(1, 4)
                                                                    .map((img, idx) => (
                                                                        <Image
                                                                            key={idx}
                                                                            src={img}
                                                                            width={24}
                                                                            height={24}
                                                                            alt="thumb"
                                                                            className="rounded border object-cover"
                                                                        />
                                                                    ))}

                                                                {order.images.length > 4 && (
                                                                    <span className="text-xs text-gray-5">
                                                                        +{order.images.length - 4} ảnh
                                                                    </span>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Tổng tiền */}
                                            <div className="min-w-[140px] font-bold text-red">
                                                {order.totalAmount.toLocaleString()} đ
                                            </div>

                                            {/* Thao tác */}
                                            <div className="min-w-[120px] flex justify-end">
                                                {/* Xem chi tiết */}
                                                <button
                                                    onClick={() => openDetailModal(order)}
                                                    className="text-gray-700 hover:text-blue-dark"
                                                >
                                                    <Eye size={20} />
                                                </button>

                                                {/* Hủy đơn – chỉ khi PENDING */}
                                                {order.status === "PENDING" && (
                                                    <button
                                                        onClick={() => handleCancel(order.id)}
                                                        className="text-red-500 hover:text-red-dark"
                                                    >
                                                        <X size={20} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-8">
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
            <Modal
                open={detailModalOpen}
                onCancel={() => setDetailModalOpen(false)}
                footer={null}
                centered
                width={650}
                className="order-detail-modal"
            >
                {selectedOrder && (
                    <div className="bg-white rounded-xl overflow-hidden">

                        {/* HEADER */}
                        <div className="bg-blue-50 px-6 py-4 border-b border-gray-2">
                            <h2 className="text-xl font-semibold text-blue-dark">
                                Chi tiết đơn hàng #{selectedOrder.orderCode?.slice(-7)}
                            </h2>
                            <p className="text-sm text-gray-6 mt-1">
                                Ngày đặt: {selectedOrder.createdAt}
                            </p>
                            <p className="text-sm text-gray-6 mt-1">Địa chỉ ship: {selectedOrder.shippingAddress}
                            </p>
                        </div>

                        {/* BODY */}
                        <div className="px-6 py-5 space-y-6">

                            {/* TRẠNG THÁI */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-7 mb-1">
                                    Trạng thái đơn hàng
                                </h3>
                                <Badge status={selectedOrder.status} />
                            </div>

                            {/* TỔNG TIỀN */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-7 mb-1">
                                    Tổng tiền
                                </h3>
                                <p className="text-lg font-bold text-red-dark">
                                    {selectedOrder.totalAmount.toLocaleString()} đ
                                </p>
                            </div>

                            {/* SẢN PHẨM */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-7 mb-3">
                                    Sản phẩm ({selectedOrder.items.length})
                                </h3>

                                <div
                                    className="space-y-4 overflow-y-auto pr-2"
                                    style={{ maxHeight: "200px" }}
                                >
                                    {selectedOrder.items.map((item: any) => (
                                        <div
                                            key={item.id}
                                            className="flex gap-4 p-4 border border-gray-2 rounded-lg hover:shadow-sm transition"
                                        >
                                            <Image
                                                src={item.images?.[0] || "/images/book-default.jpg"}
                                                width={70}
                                                height={70}
                                                alt="product"
                                                className="rounded object-cover border"
                                            />

                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-7">
                                                    {item.bookTitle}
                                                </p>

                                                <p className="text-sm text-gray-5 mt-1">
                                                    Số lượng: {item.quantity}
                                                </p>

                                                <p className="text-sm text-gray-5">
                                                    Giá: {item.price.toLocaleString()} đ
                                                </p>

                                                <p className="text-sm font-semibold text-gray-7 mt-2">
                                                    Thành tiền: {item.total.toLocaleString()} đ
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* FOOTER */}
                        {selectedOrder.status === "PENDING" && (
                            <div className="bg-gray-5 px-6 py-4 border-t flex justify-end">
                                 <button
                                        onClick={() => handleCancel(selectedOrder.id)}
                                        className="px-5 py-2 bg-red-light text-white rounded-lg hover:bg-red-dark transition text-sm"
                                    >
                                        Hủy đơn hàng
                                    </button>

                            </div>
                        )}
                    </div>
                )}
            </Modal>
        </>
    );
};

export default OrdersList;
