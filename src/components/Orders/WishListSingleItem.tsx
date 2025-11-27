"use client";

import Image from "next/image";
import { useWishlist } from "@/hook/useWishlist";
import { useCart } from "@/hook/useCart";
import {Trash2} from "lucide-react";

const WishListSingleItem = ({ item }) => {
    const { toggle } = useWishlist();
    const { addToCart } = useCart();

    return (
        <div className="flex items-center border-t border-gray-3 py-5 px-10">
            {/* REMOVE BUTTON */}
            <div className="min-w-[83px]">
                <button
                    onClick={() => toggle({
                        id: item.bookId,
                        title: item.title,
                        authorName: item.authorName,
                        price: item.price,
                        coverUrl: item.coverUrl
                    })}
                    aria-label="remove wishlist"
                    className="flex items-center justify-center rounded-lg max-w-[38px] h-9.5 bg-gray-2 border border-gray-3 hover:bg-red-light-6 hover:border-red-light-4 hover:text-red"
                >
                    <Trash2 size={24} />
                </button>
            </div>

            {/* PRODUCT COLUMN */}
            <div className="min-w-[387px]">
                <div className="flex items-center gap-5">
                    <div className="flex items-center justify-center rounded-[5px] bg-gray-2 w-[80px] h-[90px]">
                        <Image
                            src={item.coverUrl || "/images/default-book.png"}
                            alt={item.title}
                            width={80}
                            height={100}
                            className="object-cover"
                        />
                    </div>

                    <h3 className="text-dark hover:text-blue transition">
                        {item.title}
                    </h3>
                </div>
            </div>
            {/* Author name */}
            <div className="min-w-[265px]">
                <span className="text-green-600 font-medium">{item.authorName}</span>
            </div>

            {/* PRICE */}
            <div className="min-w-[205px]">
                <p className="text-dark">${item.price.toLocaleString()}</p>
            </div>

            {/* ACTION */}
            <div className="min-w-[150px] flex justify-end">
                <button
                    onClick={() => addToCart(item.bookId, 1)}
                    className="inline-flex text-dark hover:text-white bg-gray-1 border border-gray-3 py-2.5 px-6 rounded-md hover:bg-blue"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default WishListSingleItem;
