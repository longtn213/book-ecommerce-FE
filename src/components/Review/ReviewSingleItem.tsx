"use client";

import Image from "next/image";
import { Star, Trash2, Edit3 } from "lucide-react";
import dayjs from "dayjs";

const MyReviewSingleItem = ({ review, onDelete, onEdit }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-5 shadow-sm">
            <div className="flex gap-6">

                {/* BOOK IMAGE */}
                <div className="w-[90px] h-[150px] flex-shrink-0 rounded-md overflow-hidden bg-gray-50 border">
                    <Image
                        src={
                            review.bookImages?.[0] ??
                            "/images/default-book.png"
                        }
                        alt={review.bookTitle}
                        width={90}
                        height={150}
                        className="object-cover"
                    />
                </div>

                {/* CONTENT */}
                <div className="flex-1">
                    {/* Book Title */}
                    <h3 className="text-lg font-semibold text-darkCustom mb-1">
                        {review.bookTitle}
                    </h3>

                    {/* Order code */}
                    <p className="text-sm text-gray-500 mb-2">
                        Mã đơn hàng: <span className="text-gray-700">{review.orderCode}</span>
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2 text-yellow-500">
                        {Array.from({ length: 5 }).map((_, idx) => (
                            <Star
                                key={idx}
                                size={18}
                                fill={idx < review.rating ? "#fbbf24" : "#e5e7eb"}
                                stroke="none"
                            />
                        ))}
                    </div>

                    {/* Comment */}
                    <p className="text-gray-700 leading-relaxed mb-3">
                        {review.comment}
                    </p>

                    {/* Date */}
                    <p className="text-sm text-gray-500">
                        Đánh giá vào: {dayjs(review.createdAt).format("DD/MM/YYYY")}
                    </p>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-col gap-3 items-end">
                    <button
                        className="flex items-center gap-1 text-blue hover:text-blue-dark"
                        onClick={() => onEdit(review)}
                    >
                        <Edit3 size={18} /> Sửa
                    </button>

                    <button
                        className="flex items-center gap-1 text-red-500 hover:text-red-600"
                        onClick={() => {
                            console.log("clicked delete", review.id);
                            onDelete(review.id);
                        }}

                    >
                        <Trash2 size={18} /> Xoá
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyReviewSingleItem;
