"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import { useModalContext } from "@/app/context/QuickViewModalContext";
import { useDispatch } from "react-redux";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { AppDispatch } from "@/redux/store";

import { useAuthContext } from "@/context/AuthContext";
import { useCart } from "@/hook/useCart";
import { useWishlist } from "@/hook/useWishlist";

const SingleGridItem = ({ item }) => {
    const { openModal } = useModalContext();
    const dispatch = useDispatch<AppDispatch>();

    const { user, requireLogin } = useAuthContext();
    const { addToCart } = useCart();
    const { isWishlisted, toggle } = useWishlist();

    // IMAGE
    const imageUrl =
        item.images?.[0] || "/images/placeholder/book-placeholder.png";

    // PRICE
    const originalPrice = item.price ?? 0;
    const discountedPrice = item.discountedPrice ?? originalPrice;

    // ⭐ QuickView
    const handleQuickView = () => {
        dispatch(updateQuickView(item));
        openModal();
    };

    // 🛒 Add to cart
    const handleAddToCart = () => {
        if (!user) return requireLogin("thêm sản phẩm vào giỏ hàng");
        addToCart(item.id, 1);
    };

    // ❤️ Wishlist toggle
    const handleToggleWishlist = () => {
        toggle({
            id: item.id,
            title: item.title,
            authorName: item.authors?.join(", ") || "",
            price: item.price,
            coverUrl: item.images?.[0] || "",
        });
    };

    return (
        <div className="group">
            {/* IMAGE */}
            <div className="relative overflow-hidden flex items-center justify-center rounded-lg bg-white shadow-1 min-h-[270px] mb-4">
                <Image
                    src={imageUrl}
                    alt={item.title}
                    width={250}
                    height={250}
                    className="object-contain"
                />

                {/* HOVER BUTTONS */}
                <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">

                    {/* QUICK VIEW */}
                    <button
                        onClick={handleQuickView}
                        aria-label="button for quick view"
                        className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 text-dark bg-white hover:text-blue"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 3C4 3 1.3 6.1.5 7.3a1 1 0 000 1.4C1.3 9.9 4 13 8 13s6.7-3.1 7.5-4.3a1 1 0 000-1.4C14.7 6.1 12 3 8 3zm0 8c-2 0-3.5-1.7-3.5-3.5S6 4 8 4s3.5 1.7 3.5 3.5S10 11 8 11zm0-5A1.5 1.5 0 118 9a1.5 1.5 0 010-3z"/>
                        </svg>
                    </button>

                    {/* ADD TO CART */}
                    <button
                        onClick={handleAddToCart}
                        className="inline-flex py-[7px] px-5 rounded-[5px] bg-blue text-white font-medium text-custom-sm hover:bg-blue-dark"
                    >
                        Add to cart
                    </button>

                    {/* ❤️ WISHLIST */}
                    <button
                        onClick={handleToggleWishlist}
                        aria-label="button for wishlist"
                        className={`flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 bg-white 
                            ${isWishlisted(item.id) ? "text-red-500" : "text-dark"} 
                            hover:text-blue`}
                    >
                        {isWishlisted(item.id) ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="red">
                                <path d="M12 21s-6.2-4.3-9.3-8.6C-1.2 7.2 2 2 6.5 2 9 2 11 3.5 12 5.1 13 3.5 15 2 17.5 2 22 2 25.2 7.2 21.3 12.4 18.2 16.7 12 21 12 21z"/>
                            </svg>
                        ) : (
                            <svg width="20" height="20" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path d="M12.1 8.64l-.1.1-.11-.1C10.14 6.6 7.11 6.6 5.17 8.54c-1.93 1.93-1.93 5.07 0 7L12 22l6.83-6.46c1.93-1.93 1.93-5.07 0-7C16.89 6.6 13.86 6.6 12.1 8.64z"/>
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* RATING */}
            <div className="flex items-center gap-2.5 mb-2">
                <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Image
                            key={i}
                            src="/images/icons/icon-star.svg"
                            alt="star"
                            width={15}
                            height={15}
                            className={i < Math.round(item.rating) ? "opacity-100" : "opacity-30"}
                        />
                    ))}
                </div>
                <p className="text-custom-sm">({item.rating?.toFixed(1)})</p>
            </div>

            {/* TITLE */}
            <h3 className="font-medium text-dark hover:text-blue mb-1.5">
                <Link href={`/book/${item.slug}`}>{item.title}</Link>
            </h3>

            {/* PRICE */}
            <span className="flex items-center gap-2 font-medium text-lg">
                <span className="text-dark">{discountedPrice.toLocaleString()}₫</span>

                {discountedPrice !== originalPrice && (
                    <span className="text-gray-400 line-through">
                        {originalPrice.toLocaleString()}₫
                    </span>
                )}
            </span>
        </div>
    );
};

export default SingleGridItem;
