"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Rate, Input, notification } from "antd";
import { createReviewAPI } from "@/services/reviewService";
import Breadcrumb from "@/components/Common/Breadcrumb";

export default function WriteReviewPage() {
    const { id } = useParams(); // lấy orderItemId từ dynamic route
    const router = useRouter();

    const orderItemId = Number(id);

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [api, contextHolder] = notification.useNotification();

    const submit = async () => {

        try {
            await createReviewAPI({ orderItemId, rating, comment });

            api.success({
                message: "Gửi đánh giá thành công!",
            });

            router.push("/my-reviews");
        } catch (err: any) {
            api.error({
                message: "Không thể gửi đánh giá!",
                description: err?.response?.data?.message || "",
            });
        }
    };

    return (
        <>
            {contextHolder}
            <Breadcrumb title="Viết đánh giá" pages={["My-Reviews"]} />

            <div className="max-w-[600px] mx-auto py-10 px-4">
                <h2 className="text-2xl font-semibold mb-6">Viết đánh giá</h2>

                {/* Rating */}
                <div className="mb-4">
                    <p className="font-medium mb-1">Chọn số sao:</p>
                    <Rate value={rating} onChange={setRating} />
                </div>

                {/* Comment */}
                <div className="mb-6">
                    <p className="font-medium mb-1">Nội dung đánh giá:</p>
                    <Input.TextArea
                        rows={5}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Hãy chia sẻ cảm nhận của bạn về cuốn sách..."
                    />
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => router.back()}
                        className="px-4 py-2 border rounded-lg"
                    >
                        Hủy
                    </button>

                    <button
                        onClick={submit}
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Gửi đánh giá
                    </button>
                </div>
            </div>
        </>
    );
}
