"use client";

import { Book } from "@/types/book";
import Link from "next/link";

interface Props {
    book: Book;
}

const BookCard = ({ book }: Props) => {
    const cover = book.images?.[0] ?? "/placeholder-book.png";
    const author = book.authors?.[0] ?? "Không rõ tác giả";
    const hasDetail = book.id && book.id !== 0;

    return (
        <div className="rounded-lg border bg-white p-3 shadow-sm hover:shadow-md transition flex flex-col">

            {/* Ảnh sách */}
            <div className="w-full flex justify-center mb-2">
                <img
                    src={cover}
                    alt={book.title}
                    className="h-28 w-20 object-cover rounded"
                />
            </div>

            {/* Thông tin */}
            <div className="flex-1 flex flex-col">
                <h4 className="text-sm font-semibold line-clamp-2">
                    {book.title}
                </h4>

                <p className="text-xs text-gray-500 mt-1 whitespace-pre-line leading-4">
                    Tác giả: {author}
                </p>


                <p className="mt-1 text-xs font-semibold text-emerald">
                    {book.price
                        ? `${book.price.toLocaleString("vi-VN")} đ`
                        : "Chưa có giá"}
                </p>

                {hasDetail ? (
                    <Link
                        href={`/shop-details/${book.id}`}
                        className="mt-auto text-xs text-primary hover:underline"
                    >
                        Xem chi tiết
                    </Link>
                ) : (
                    <p className="mt-auto text-xs text-gray-400">Không có chi tiết</p>
                )}
            </div>
        </div>
    );
};

export default BookCard;
