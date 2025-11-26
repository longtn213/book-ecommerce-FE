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
    const sliderRef = useRef(null);

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
        <section className="overflow-hidden mt-16 pb-10">
            <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
                            <Image
                                src="/images/icons/icon-08.svg"
                                alt="icon"
                                width={17}
                                height={17}
                            />
                            Đánh giá & Nhận xét
                        </span>
                        <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
                            Người dùng nói gì về sách?
                        </h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <button onClick={handlePrev} className="
        w-9 h-9 flex items-center justify-center
        border border-gray-300
        rounded-lg bg-white
        hover:border-blue-500 hover:text-blue-600
        transition
    ">
                            <svg
                                className="fill-current"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M15.4881 4.43057C15.8026 4.70014 15.839 5.17361 15.5694 5.48811L9.98781 12L15.5694 18.5119C15.839 18.8264 15.8026 19.2999 15.4881 19.5695C15.1736 19.839 14.7001 19.8026 14.4306 19.4881L8.43056 12.4881C8.18981 12.2072 8.18981 11.7928 8.43056 11.5119L14.4306 4.51192C14.7001 4.19743 15.1736 4.161 15.4881 4.43057Z"
                                />
                            </svg>
                        </button>

                        <button onClick={handleNext} className="
        w-9 h-9 flex items-center justify-center
        border border-gray-300
        rounded-lg bg-white
        hover:border-blue-500 hover:text-blue-600
        transition
    ">
                            <svg
                                className="fill-current"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
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
                    <p>Đang tải đánh giá...</p>
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
                        {reviews.map((review) => (
                            <SwiperSlide key={review.id}>
                                <div className="bg-white p-6 rounded-xl shadow">
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

                                    {/* Avatar + User */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <Image
                                            src={review.authorImg}
                                            alt="avatar"
                                            width={45}
                                            height={45}
                                            className="rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="font-semibold text-dark">
                                                {review.authorName}
                                            </p>
                                            <span className="text-gray-500 text-sm">
                                                {formatReviewDate(review.createdAt)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Comment */}
                                    <p className="text-gray-700 leading-relaxed">
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
