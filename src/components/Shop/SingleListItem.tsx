"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import { useModalContext } from "@/app/context/QuickViewModalContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

import { useAuthContext } from "@/context/AuthContext";
import { useCart } from "@/hook/useCart";
import { useWishlist } from "@/hook/useWishlist";

const SingleListItem = ({ item }: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const { openModal } = useModalContext();

    const { user, requireLogin } = useAuthContext();
    const { addToCart } = useCart();
    const { isWishlisted, toggle } = useWishlist();

    const previewImg =
        item.images?.[0] || "/images/placeholder/book-placeholder.png";

    const originalPrice = item.price ?? 0;
    const discountedPrice = item.discountedPrice ?? originalPrice;

    const handleQuickView = () => {
        dispatch(updateQuickView({ ...item }));
        openModal();
    };

    const handleAddToCart = () => {
        if (!user) return requireLogin("thêm sản phẩm vào giỏ hàng");
        addToCart(item.id, 1);
    };

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
        <div className="group rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex">
                {/* IMAGE SIDE */}
                <div className="relative overflow-hidden flex items-center justify-center w-[260px] sm:min-h-[260px] p-4 bg-gray-50 rounded-l-xl">
                    <Image
                        src={previewImg}
                        alt={item.title}
                        width={260}
                        height={260}
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* ACTION BAR */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-3">
                        {/* QUICK VIEW */}
                        <button
                            onClick={handleQuickView}
                            className="w-10 h-10 flex items-center justify-center rounded-lg bg-white shadow-md text-gray-700 hover:bg-blue-600 hover:text-white transition"
                        >
                            <svg
                                className="fill-current"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M8.00016 5.5C6.61945 5.5 5.50016 6.61929 5.50016 8C5.50016 9.38071 6.61945 10.5 8.00016 10.5C9.38087 10.5 10.5002 9.38071 10.5002 8C10.5002 6.61929 9.38087 5.5 8.00016 5.5ZM6.50016 8C6.50016 7.17157 7.17174 6.5 8.00016 6.5C8.82859 6.5 9.50016 7.17157 9.50016 8C9.50016 8.82842 8.82859 9.5 8.00016 9.5C7.17174 9.5 6.50016 8.82842 6.50016 8Z"
                                    fill=""
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M8.00016 2.16666C4.99074 2.16666 2.96369 3.96946 1.78721 5.49791L1.76599 5.52546C1.49992 5.87102 1.25487 6.18928 1.08862 6.5656C0.910592 6.96858 0.833496 7.40779 0.833496 8C0.833496 8.5922 0.910592 9.03142 1.08862 9.4344C1.25487 9.81072 1.49992 10.129 1.76599 10.4745L1.78721 10.5021C2.96369 12.0305 4.99074 13.8333 8.00016 13.8333C11.0096 13.8333 13.0366 12.0305 14.2131 10.5021L14.2343 10.4745C14.5004 10.129 14.7455 9.81072 14.9117 9.4344C15.0897 9.03142 15.1668 8.5922 15.1668 8C15.1668 7.40779 15.0897 6.96858 14.9117 6.5656C14.7455 6.18927 14.5004 5.87101 14.2343 5.52545L14.2131 5.49791C13.0366 3.96946 11.0096 2.16666 8.00016 2.16666ZM2.57964 6.10786C3.66592 4.69661 5.43374 3.16666 8.00016 3.16666C10.5666 3.16666 12.3344 4.69661 13.4207 6.10786C13.7131 6.48772 13.8843 6.7147 13.997 6.9697C14.1023 7.20801 14.1668 7.49929 14.1668 8C14.1668 8.50071 14.1023 8.79199 13.997 9.0303C13.8843 9.28529 13.7131 9.51227 13.4207 9.89213C12.3344 11.3034 10.5666 12.8333 8.00016 12.8333C5.43374 12.8333 3.66592 11.3034 2.57964 9.89213C2.28725 9.51227 2.11599 9.28529 2.00334 9.0303C1.89805 8.79199 1.8335 8.50071 1.8335 8C1.8335 7.49929 1.89805 7.20801 2.00334 6.9697C2.11599 6.7147 2.28725 6.48772 2.57964 6.10786Z"
                                    fill=""
                                />
                            </svg>
                        </button>

                        {/* ADD TO CART */}
                        <button
                            onClick={handleAddToCart}
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition shadow-md"
                        >
                            Thêm vào giỏ
                        </button>

                        {/* WISHLIST */}
                        <button
                            onClick={handleToggleWishlist}
                            className={`w-10 h-10 flex items-center justify-center rounded-lg bg-white shadow-md transition 
                ${
                                isWishlisted(item.id)
                                    ? "text-red-500"
                                    : "text-gray-700 hover:bg-blue-600 hover:text-white"
                            }`}
                        >
                            {isWishlisted(item.id) ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="red">
                                    <path d="M12 21s-6.2-4.3-9.3-8.6C-1.2 7.2 2 2 6.5 2 9 2 11 3.5 12 5.1 13 3.5 15 2 17.5 2 22 2 25.2 7.2 21.3 12.4 18.2 16.7 12 21 12 21z"/>
                                </svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                                    <path d="M12.1 8.64l-.1.1-.11-.1C10.14 6.6 7.11 6.6 5.17 8.54c-1.93 1.93-1.93 5.07 0 7L12 22l6.83-6.46c1.93-1.93 1.93-5.07 0-7C16.89 6.6 13.86 6.6 12.1 8.64z"/>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* CONTENT */}
                <div className="flex flex-col justify-between w-full py-5 px-6">
                    {/* TITLE + PRICE */}
                    <div>
                        <h3 className="font-semibold text-gray-900 text-lg hover:text-blue-600 transition mb-2">
                            <Link href={`/shop-details/${item.id}`}>{item.title}</Link>
                        </h3>

                        <div className="flex items-center gap-2 text-lg font-medium">
                            <span className="text-gray-900">{discountedPrice.toLocaleString()}₫</span>

                            {discountedPrice !== originalPrice && (
                                <span className="line-through text-gray-400 text-base">
                  {originalPrice.toLocaleString()}₫
                </span>
                            )}
                        </div>
                    </div>

                    {/* RATING */}
                    <div className="flex items-center gap-2 mt-3">
                        <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Image
                                    key={i}
                                    src="/images/icons/icon-star.svg"
                                    alt="star"
                                    width={16}
                                    height={16}
                                    className={i < Math.round(item.rating) ? "opacity-100" : "opacity-30"}
                                />
                            ))}
                        </div>
                        <span className="text-sm text-gray-600">
              ({item.rating?.toFixed(1)})
            </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleListItem;
