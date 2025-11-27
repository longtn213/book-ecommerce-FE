"use client";

import React, { useEffect, useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import { useAuthContext } from "@/context/AuthContext";
import { fetchUserReview } from "@/services/reviewService";
import MyReviewSingleItem from "@/components/Review/ReviewSingleItem";

export const MyReview = () => {
    const { user, requireLogin } = useAuthContext();

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch review khi user login
    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const loadReviews = async () => {
            const data = await fetchUserReview();
            setReviews(data);
            setLoading(false);
        };

        loadReviews();
    }, [user]);

    // Loading UI
    if (loading) {
        return (
            <>
                <Breadcrumb title="Đánh giá của tôi" pages={["My Reviews"]} />
                <div className="py-20 text-center text-gray-500">Đang tải dữ liệu...</div>
            </>
        );
    }

    // Chưa đăng nhập
    if (!user) {
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
    }

    // Có review
    return (
        <>
            <Breadcrumb title="Đánh giá của tôi" pages={["My Reviews"]} />

            <section className="py-10 bg-gray-100">
                <div className="max-w-[900px] mx-auto px-4">
                    <h2 className="text-2xl font-semibold text-dark mb-8">
                        Đánh giá của bạn
                    </h2>

                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <MyReviewSingleItem
                                key={review.id}
                                review={review}
                                onDelete={(id) => console.log("delete review", id)}
                                onEdit={(r) => console.log("edit review", r)}
                            />
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-20">
                            Bạn chưa viết đánh giá nào.
                        </p>
                    )}
                </div>
            </section>
        </>
    );
};
