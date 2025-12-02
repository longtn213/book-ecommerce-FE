"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAuthContext } from "@/context/AuthContext";
import { Review } from "@/types/review";
import { formatReviewDate } from "@/utils/helper";
import { fetchUserReviewForBook } from "@/services/reviewService";

const UserReviewSection = ({ bookId }: { bookId: number }) => {
    const { user, requireLogin } = useAuthContext();

    const [review, setReview] = useState<Review | null>(null);
    const [loading, setLoading] = useState(true);

    // Load review của user khi đăng nhập
    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const load = async () => {
            try {
                const data = await fetchUserReviewForBook(bookId);

                if (!data || !data.id) {
                    setReview(null);
                    return;
                }

                setReview({
                    id: data.id,
                    comment: data.comment,
                    rating: data.rating,
                    createdAt: new Date(data.createdAt),
                    authorName: data.fullName,
                    authorImg: data.avaUrl || "/images/user/default-avatar.png",
                    authorRole: "Customer",
                });
            } catch (err) {
                setReview(null);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [user, bookId]);

    if (loading) return null;

    // ❌ User chưa login → gợi ý đăng nhập
    if (!user) {
        return (
            <section className="mt-12">
                <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
                    <div className="p-5 border border-gray-200 rounded-xl bg-gray-50">
                        <p className="text-gray-700">
                            Bạn cần{" "}
                            <span
                                className="text-blue cursor-pointer underline font-medium"
                                onClick={() => requireLogin("viết đánh giá")}
                            >
                đăng nhập
              </span>{" "}
                            để viết đánh giá cho sách này.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    // ❌ User login nhưng chưa từng review → không hiển thị
    if (!review) return null;

    // ✅ Có review → hiển thị UI
    return (
        <section className="mt-16 pb-8">
            <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
                {/* HEADER */}
                <div className="mb-6">
                    <h2 className="font-semibold text-xl text-gray-900 mb-1">
                        Đánh giá của bạn
                    </h2>
                    <p className="text-gray-600 text-sm">
                        Cảm nhận của bạn về cuốn sách này
                    </p>
                </div>

                {/* REVIEW CARD */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                    {/* TOP ROW */}
                    <div className="flex items-center justify-between mb-4">
                        {/* Rating */}
                        <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Image
                                    key={i}
                                    src="/images/icons/icon-star.svg"
                                    width={20}
                                    height={20}
                                    alt="star"
                                    className={i < review.rating ? "" : "opacity-30"}
                                />
                            ))}
                        </div>

                        <span className="text-xs text-gray-500">
              {formatReviewDate(review.createdAt)}
            </span>
                    </div>

                    {/* USER INFO */}
                    <div className="flex items-center gap-4 mb-4">
                        <Image
                            src={review.authorImg}
                            alt="avatar"
                            width={50}
                            height={50}
                            className="rounded-full border object-cover"
                        />

                        <div>
                            <p className="font-semibold text-gray-900">{review.authorName}</p>
                            <p className="text-sm text-gray-500">Khách hàng</p>
                        </div>
                    </div>

                    {/* COMMENT BUBBLE */}
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800 leading-relaxed">
                        {review.comment}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserReviewSection;
