"use client";

import Image from "next/image";
import { useWishlist } from "@/hook/useWishlist";
import { useCart } from "@/hook/useCart";
import { Trash2 } from "lucide-react";

const WishListSingleItem = ({ item }) => {
    const { toggle } = useWishlist();
    const { addToCart } = useCart();

    return (
        <div className="grid grid-cols-12 items-center border-t border-gray-200 py-6 px-4 hover:bg-gray-50 transition">

            {/* REMOVE BUTTON */}
            <div className="col-span-1 flex justify-center">
                <button
                    onClick={() =>
                        toggle({
                            id: item.bookId,
                            title: item.title,
                            authorName: item.authorName,
                            price: item.price,
                            coverUrl: item.coverUrl,
                        })
                    }
                    aria-label="remove wishlist"
                    className="p-2 rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-600 transition"
                >
                    <Trash2 size={18} />
                </button>
            </div>

            {/* BOOK INFO */}
            <div className="col-span-5 flex items-center gap-4">
                <div className="w-[80px] h-[100px] flex items-center justify-center bg-gray-100 rounded-md overflow-hidden">
                    <Image
                        src={item.coverUrl || "/images/default-book.png"}
                        alt={item.title}
                        width={80}
                        height={100}
                        className="object-cover"
                    />
                </div>

                <h3 className="text-base font-medium text-gray-800 hover:text-blue-600 transition line-clamp-2">
                    {item.title}
                </h3>
            </div>

            {/* AUTHOR */}
            <div className="col-span-3">
                <span className="text-green-600 font-medium">{item.authorName}</span>
            </div>

            {/* PRICE */}
            <div className="col-span-2">
                <p className="font-semibold text-gray-800">
                    {item.price.toLocaleString()}₫
                </p>
            </div>

            {/* ACTION BUTTON */}
            <div className="col-span-1 flex justify-center">
                <button
                    onClick={() => addToCart(item.bookId, 1)}
                    className="
                        px-4 py-2
                        rounded-lg
                        text-blue-600 border border-blue-500
                        hover:bg-blue-500 hover:text-white
                        font-medium text-sm
                        transition
                        items-center
                    "
                >
                    Thêm vào giỏ hàng
                </button>
            </div>
        </div>
    );
};

export default WishListSingleItem;
