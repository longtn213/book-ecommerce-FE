"use client";
import Link from "next/link";

export default function ChatbotRecommendList({ books, onClose }) {
    if (!books || books.length === 0) return null;

    return (
        <div className="w-full">

            <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-1">
                <span className="text-primary text-lg">📚</span>
                Gợi ý dành riêng cho bạn
            </h3>

            {/* CHỈ PHẦN NÀY SCROLL NGANG */}
            <div className="overflow-x-auto overflow-y-hidden pb-2">
                <div className="flex gap-4">
                    {books.map((book, i) => (
                        <div
                            key={i}
                            className="min-w-[140px] border rounded-xl p-3 shadow-sm"
                        >
                            <img
                                src={book.images?.[0] ?? "/placeholder-book.png"}
                                className="h-28 w-20 object-cover rounded mx-auto"
                                alt={book.title}
                            />

                            <p className="text-xs font-semibold mt-2 line-clamp-2 text-center">
                                <Link
                                    href={`/shop-details/${book.id}`}
                                    onClick={() => {
                                        if (onClose) onClose();
                                    }}
                                    className="mt-auto text-xs text-primary hover:underline"
                                >
                                    {book.title}
                                </Link>

                            </p>

                            <p className="mt-1 text-xs font-bold text-green-600 text-center">
                                {book.price?.toLocaleString("vi-VN")} đ
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
