"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAuthContext } from "@/context/AuthContext";
import { Review } from "@/types/review";
import { formatReviewDate } from "@/utils/helper";
import { fetchUserReviewForBook } from "@/services/reviewService";

const UserReviewSection = ({ bookId }: { bookId: number }) => {
    const { user,requireLogin } = useAuthContext();

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

                // ⚠️ FIX QUAN TRỌNG: Nếu data = null hoặc không có id → không có review
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


    // Nếu đang loading, không render gì
    if (loading) return null;

    // ❌ Nếu user chưa đăng nhập → không hiển thị gì
    if (!user) {
        return (
            <section className="mt-12">
                <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
                    <div className="p-5 border border-gray-300 rounded-xl bg-gray-50">
                        <p className="text-gray-700">
                            Bạn cần{" "}
                            <span
                                className="text-blue cursor-pointer underline"
                                onClick={() => requireLogin("viết đánh giá")}
                            >
                                đăng nhập và mua sắm
                            </span>{" "}
                            để viết đánh giá cho sách này.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    // ❌ Nếu user đăng nhập nhưng chưa review → không hiển thị gì
    if (!review) return null;

    // ✅ Chỉ hiển thị khi user đã review
    return (
        <section className="mt-16 pb-5">
            <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">

                <div className="mb-6">
                    <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
                        <Image
                            src="/images/icons/icon-08.svg"
                            alt="icon"
                            width={17}
                            height={17}
                        />
                        Đánh giá của bạn
                    </span>
                    <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
                        Cảm nhận của bạn về cuốn sách này
                    </h2>
                </div>

                <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        {/* Stars */}
                        <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Image
                                    key={i}
                                    src="/images/icons/icon-star.svg"
                                    width={22}
                                    height={22}
                                    alt="star"
                                    className={i < review.rating ? "" : "opacity-25"}
                                />
                            ))}
                        </div>

                        <span className="text-sm text-gray-500">
                            {formatReviewDate(review.createdAt)}
                        </span>
                    </div>

                    {/* Avatar */}
                    <div className="flex items-center gap-4 mb-4">
                        <Image
                            src={review.authorImg}
                            alt="avatar"
                            width={48}
                            height={48}
                            className="rounded-full object-cover"
                        />
                        <div>
                            <p className="font-semibold text-dark">{review.authorName}</p>
                            <p className="text-sm text-gray-500">Customer</p>
                        </div>
                    </div>

                    {/* Comment */}
                    <p className="text-gray-800 leading-relaxed">{review.comment}</p>

                </div>
            </div>
        </section>
    );
};

export default UserReviewSection;
