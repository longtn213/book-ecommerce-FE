import React from "react";
import { Review } from "@/types/review";
import Image from "next/image";

const ReviewSingleItem = ({ testimonial }: { testimonial: Review }) => {
    // Format date tiếng Việt
    const formattedDate = testimonial.createdAt.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    return (
        <div className="shadow-testimonial bg-white rounded-[10px] py-7.5 px-4 sm:px-8.5 m-1">

            {/* Rating Stars */}
            <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Image
                        key={i}
                        src="/images/icons/icon-star.svg"
                        alt="star"
                        width={14}
                        height={14}
                        className={i < Math.round(testimonial.rating) ? "" : "opacity-30"}
                    />
                ))}
            </div>

            {/* Comment */}
            <p className="text-dark mb-4 italic">{testimonial.comment}</p>

            {/* Date */}
            <p className="text-xs text-gray-500 mb-4">Ngày đánh giá: {formattedDate}</p>

            {/* Author */}
            <div className="flex items-center gap-4 mt-3">
                <div className="w-12.5 h-12.5 rounded-full overflow-hidden">
                    <Image
                        src={testimonial.authorImg}
                        alt="author"
                        width={50}
                        height={50}
                        className="object-cover rounded-full"
                    />
                </div>

                <div>
                    <h3 className="font-medium text-dark">{testimonial.authorName}</h3>
                    <p className="text-custom-sm text-gray-500">{testimonial.authorRole}</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewSingleItem;
