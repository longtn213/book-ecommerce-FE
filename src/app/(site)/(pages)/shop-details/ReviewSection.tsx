"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { fetchReviewsByBookId } from "@/services/reviewService";
import { Review } from "@/types/review";
import { formatReviewDate } from "@/utils/helper";

const ReviewSection = ({ bookId }: { bookId: number }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const sliderRef = useRef<any>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchReviewsByBookId(bookId);
                const mapped: Review[] = data.map((r: any) => ({
                    comment: r.comment,
                    authorName: r.fullName,
                    authorRole: "Customer",
                    authorImg: r.avaUrl || "/images/user/default-avatar.png",
                    rating: r.rating,
                    createdAt: new Date(r.createdAt),
                }));

                setReviews(mapped);
            } catch (error) {
                console.error("Review error:", error);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [bookId]);

    const handlePrev = () => sliderRef.current?.swiper.slidePrev();
    const handleNext = () => sliderRef.current?.swiper.slideNext();

    return (
        <section className="mt-20 pb-10">
            <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="font-semibold text-xl xl:text-2xl text-gray-900">
                            Đánh giá từ người dùng
                        </h2>
                        <p className="text-gray-600 mt-1 text-sm">
                            Xem mọi người nói gì về cuốn sách này
                        </p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handlePrev}
                            className="
                                w-10 h-10 flex items-center justify-center
                                rounded-full border border-gray-300
                                bg-white shadow-sm
                                hover:border-blue-500 hover:text-blue-600 transition
                            "
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M15.4881 4.43057C15.8026 4.70014 15.839 5.17361 15.5694 5.48811L9.98781 12L15.5694 18.5119C15.839 18.8264 15.8026 19.2999 15.4881 19.5695C15.1736 19.839 14.7001 19.8026 14.4306 19.4881L8.43056 12.4881C8.18981 12.2072 8.18981 11.7928 8.43056 11.5119L14.4306 4.51192C14.7001 4.19743 15.1736 4.161 15.4881 4.43057Z"
                                />
                            </svg>
                        </button>

                        <button
                            onClick={handleNext}
                            className="
                                w-10 h-10 flex items-center justify-center
                                rounded-full border border-gray-300
                                bg-white shadow-sm
                                hover:border-blue-500 hover:text-blue-600 transition
                            "
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M8.51192 4.43057C8.82641 4.161 9.29989 4.19743 9.56946 4.51192L15.5695 11.5119C15.8102 11.7928 15.8102 12.2072 15.5695 12.4881L9.56946 19.4881C9.29989 19.8026 8.82641 19.839 8.51192 19.5695C8.19743 19.2999 8.161 18.8264 8.43057 18.5119L14.0122 12L8.43057 5.48811C8.161 5.17361 8.19743 4.70014 8.51192 4.43057Z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Swiper */}
                {loading ? (
                    <p className="text-gray-600">Đang tải đánh giá...</p>
                ) : reviews.length === 0 ? (
                    <p className="text-gray-500">Chưa có đánh giá nào.</p>
                ) : (
                    <Swiper
                        ref={sliderRef}
                        slidesPerView={3}
                        spaceBetween={20}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            1000: { slidesPerView: 2 },
                            1200: { slidesPerView: 3 },
                        }}
                    >
                        {reviews.map((review, idx) => (
                            <SwiperSlide key={idx}>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">

                                    {/* Rating */}
                                    <div className="flex items-center gap-1 mb-3">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Image
                                                key={i}
                                                src="/images/icons/icon-star.svg"
                                                width={20}
                                                height={20}
                                                alt="star"
                                                className={i < review.rating ? "" : "opacity-25"}
                                            />
                                        ))}
                                    </div>

                                    {/* User Info */}
                                    <div className="flex items-center gap-4 mb-4">
                                        <Image
                                            src={review.authorImg}
                                            alt="avatar"
                                            width={50}
                                            height={50}
                                            className="rounded-full border object-cover"
                                        />
                                        <div>
                                            <p className="font-semibold text-gray-900">
                                                {review.authorName}
                                            </p>
                                            <span className="text-gray-500 text-sm">
                                                {formatReviewDate(review.createdAt)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Comment bubble */}
                                    <p className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800 leading-relaxed">
                                        {review.comment}
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </section>
    );
};

export default ReviewSection;
