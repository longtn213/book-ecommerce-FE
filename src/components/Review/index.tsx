"use client";

import React, { useEffect, useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import { useAuthContext } from "@/context/AuthContext";
import { fetchUserReview, updateReviewAPI, deleteReviewAPI } from "@/services/reviewService";
import { Modal, Rate, Input, notification } from "antd";
import MyReviewSingleItem from "@/components/Review/ReviewSingleItem";

export const MyReview = () => {
    const { user, requireLogin } = useAuthContext();

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- Modal State ---
    const [editOpen, setEditOpen] = useState(false);
    const [editData, setEditData] = useState({ reviewId: null, rating: 5, comment: "" });
    const [api, contextHolder] = notification.useNotification();
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);


    // Load reviews
    const loadReviews = async () => {
        if (!user) return;

        const data = await fetchUserReview();
        setReviews(data || []);
        setLoading(false);
    };

    useEffect(() => {
        if (user) loadReviews();
        else setLoading(false);
    }, [user]);

    // ============================
    // HANDLE EDIT (OPEN MODAL)
    // ============================
    const handleEdit = (review) => {
        setEditData({
            reviewId: review.id,
            rating: review.rating,
            comment: review.comment,
        });
        setEditOpen(true);
    };

    // ============================
    // SUBMIT UPDATE
    // ============================
    const submitUpdate = async () => {
        try {
            await updateReviewAPI(editData);
            api.success({ title: "Cập nhật review thành công!" });

            setEditOpen(false);
            await loadReviews();
        } catch (err) {
            api.error({ title: "Lỗi cập nhật review!" });
        }
    };

    // ============================
    // HANDLE DELETE
    // ============================
    const handleDelete = (id) => {
        setDeleteId(id);
        setDeleteOpen(true);
    };
    const confirmDelete = async () => {
        if (!deleteId) return;
        try {
            await deleteReviewAPI(deleteId);
            api.success({ title: "Xóa review thành công!" });
            setDeleteOpen(false);
            loadReviews();
        } catch (err) {
            api.error({ title: "Không thể xoá review!" });
        }
    };

    // ============================
    // RENDER
    // ============================
    if (loading)
        return (
            <>
                <Breadcrumb title="Đánh giá của tôi" pages={["My Reviews"]} />
                <div className="py-20 text-center text-gray-500">Đang tải dữ liệu...</div>
            </>
        );

    if (!user)
        return (
            <>
                <Breadcrumb title="Đánh giá của tôi" pages={["My Reviews"]} />
                <section className="bg-gray-100 py-20">
                    <div className="max-w-[650px] mx-auto px-4">
                        <div className="bg-white border border-gray-200 rounded-xl shadow-md p-10 text-center">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Bạn chưa đăng nhập
                            </h2>

                            <p className="text-gray-600 leading-relaxed mb-8">
                                Hãy đăng nhập để xem các đánh giá của bạn.
                            </p>

                            <button
                                onClick={() => requireLogin("đánh giá")}
                                className="px-10 py-3 bg-blue text-white text-lg rounded-lg font-medium hover:bg-blue-dark transition"
                            >
                                Đăng nhập ngay
                            </button>

                            <p className="mt-6 text-sm text-gray-500">
                                Sau khi đăng nhập bạn sẽ xem được danh sách đánh giá của mình.
                            </p>
                        </div>
                    </div>
                </section>
            </>
        );

    return (
        <>
            {contextHolder}
            <Breadcrumb title="Đánh giá của tôi" pages={["My Reviews"]} />

            <section className="py-10 bg-gray-100">
                <div className="max-w-[900px] mx-auto px-4 space-y-6">

                    {/* LIST REVIEW */}
                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <MyReviewSingleItem
                                key={review.id}
                                review={review}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                            />
                        ))
                    ) : (
                        <p className="text-center py-20 text-gray-500 text-lg">
                            Bạn chưa viết đánh giá nào.
                        </p>
                    )}
                </div>
            </section>

            {/* ============================
                MODAL EDIT REVIEW
            ============================ */}
            {/* ============================
    MODAL EDIT REVIEW - TIKI STYLE
============================= */}
            <Modal
                title={null}
                open={editOpen}
                onCancel={() => setEditOpen(false)}
                footer={null}
                className="edit-review-modal"
                centered
            >
                <div className="p-1">
                    {/* Title */}
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Chỉnh sửa đánh giá
                    </h2>

                    {/* Rating */}
                    <div className="mb-4">
                        <p className="text-gray-700 font-medium mb-2">Chọn số sao:</p>
                        <Rate
                            value={editData.rating}
                            onChange={(v) => setEditData({ ...editData, rating: v })}
                            className="text-yellow-500"
                        />
                    </div>

                    {/* Comment */}
                    <div className="mb-5">
                        <p className="text-gray-700 font-medium mb-2">Nội dung đánh giá:</p>
                        <Input.TextArea
                            rows={4}
                            value={editData.comment}
                            onChange={(e) =>
                                setEditData({ ...editData, comment: e.target.value })
                            }
                            placeholder="Nhập nội dung đánh giá..."
                            className="rounded-lg"
                        />
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex justify-end gap-3 pt-2 border-t pt-4">
                        <button
                            onClick={() => setEditOpen(false)}
                            className="
                    px-5 py-2 rounded-lg
                    border border-gray-300 bg-gray-100
                    text-gray-700 hover:bg-gray-200 transition
                "
                        >
                            Hủy
                        </button>

                        <button
                            onClick={submitUpdate}
                            className="
                    px-6 py-2 rounded-lg
                    bg-blue-600 text-white
                    hover:bg-blueCustom-dark transition
                "
                        >
                            Lưu thay đổi
                        </button>
                    </div>
                </div>
            </Modal>
            {deleteOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]">
                    <div className="bg-white w-[380px] rounded-xl shadow-lg p-6 animate-scaleIn">

                        <h3 className="text-lg font-semibold text-gray-800 text-center">
                            Xác nhận xoá đánh giá
                        </h3>

                        <p className="text-gray-600 text-sm mt-3 text-center leading-relaxed">
                            Bạn có chắc chắn muốn xoá đánh giá này?
                            <br />Hành động này không thể hoàn tác.
                        </p>

                        <div className="flex justify-center gap-3 mt-6">
                            <button
                                onClick={() => setDeleteOpen(false)}
                                className="px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 hover:bg-gray-200 transition text-sm"
                            >
                                Hủy
                            </button>

                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition text-sm"
                            >
                                Xoá
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </>
    );
};
