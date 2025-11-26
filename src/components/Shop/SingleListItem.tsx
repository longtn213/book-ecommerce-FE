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

    // IMAGE
    const previewImg =
        item.images?.[0] || "/images/placeholder/book-placeholder.png";

    // PRICES
    const originalPrice = item.price ?? 0;
    const discountedPrice = item.discountedPrice ?? originalPrice;

    // ⭐ QuickView
    const handleQuickView = () => {
        dispatch(updateQuickView({ ...item }));
        openModal();
    };

    // 🛒 Add to Cart
    const handleAddToCart = () => {
        if (!user) return requireLogin("thêm sản phẩm vào giỏ hàng");

        addToCart(item.id, 1);
    };

    // ❤️ Wishlist Toggle
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
        <div className="group rounded-lg bg-white shadow-1">
            <div className="flex">
                {/* LEFT IMAGE */}
                <div className="shadow-list relative overflow-hidden flex items-center justify-center max-w-[270px] w-full sm:min-h-[270px] p-4">
                    <Image
                        src={previewImg}
                        alt={item.title}
                        width={250}
                        height={250}
                        className="object-cover"
                    />

                    {/* HOVER BUTTONS */}
                    <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">

                        {/* QUICK VIEW */}
                        <button
                            onClick={handleQuickView}
                            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 text-dark bg-white hover:text-blue"
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
                            className="inline-flex font-medium text-custom-sm py-[7px] px-5 rounded-[5px] bg-blue text-white hover:bg-blue-dark"
                        >
                            Add to cart
                        </button>

                        {/* WISHLIST */}
                        <button
                            onClick={handleToggleWishlist}
                            className={`flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 bg-white 
                            ${isWishlisted(item.id) ? "text-red-500" : "text-dark"} 
                            hover:text-blue`}
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

                {/* RIGHT CONTENT */}
                <div className="w-full flex flex-col gap-5 sm:flex-row sm:items-center justify-center sm:justify-between py-5 px-4 sm:px-7.5 lg:pl-11 lg:pr-12">
                    <div>
                        <h3 className="font-medium text-dark hover:text-blue mb-1.5">
                            <Link href={`/shop-details/${item.id}`}>{item.title}</Link>
                        </h3>

                        {/* PRICE */}
                        <span className="flex items-center gap-2 font-medium text-lg">
                            <span className="text-dark">
                                {discountedPrice.toLocaleString()}₫
                            </span>

                            {discountedPrice !== originalPrice && (
                                <span className="text-gray-400 line-through">
                                    {originalPrice.toLocaleString()}₫
                                </span>
                            )}
                        </span>
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
                </div>
            </div>
        </div>
    );
};

export default SingleListItem;
