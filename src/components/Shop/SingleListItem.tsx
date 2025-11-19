"use client";
import React from "react";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { addItemToCart } from "@/redux/features/cart-slice";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import Image from "next/image";

const SingleListItem = ({ item }: any) => {
    const { openModal } = useModalContext();
    const dispatch = useDispatch<AppDispatch>();

    // === FIX IMAGE ===
    const previewImg =
        item.images?.length > 0
            ? item.images[0]
            : "/images/placeholder/book-placeholder.png";

    // === PRICE LOGIC ===
    const originalPrice = item.price ?? 0;
    const discountedPrice = item.discountedPrice ?? item.price ?? 0;

    // === REVIEWS (FALLBACK) ===
    const reviews = item.reviews ?? 0;

    // === Quick view ===
    const handleQuickViewUpdate = () => {
        dispatch(updateQuickView({ ...item }));
    };

    // === Add to cart ===
    const handleAddToCart = () => {
        dispatch(
            addItemToCart({
                ...item,
                quantity: 1,
            })
        );
    };

    // === Wishlist ===
    const handleItemToWishList = () => {
        dispatch(
            addItemToWishlist({
                ...item,
                status: "available",
                quantity: 1,
            })
        );
    };

    return (
        <div className="group rounded-lg bg-white shadow-1">
            <div className="flex">
                <div className="shadow-list relative overflow-hidden flex items-center justify-center max-w-[270px] w-full sm:min-h-[270px] p-4">

                    {/* FIXED IMAGE */}
                    <Image src={previewImg} alt={item.title} width={250} height={250} />

                    {/* Hover buttons */}
                    <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
                        <button
                            onClick={() => {
                                openModal();
                                handleQuickViewUpdate();
                            }}
                            aria-label="button for quick view"
                            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-blue"
                        >
                            {/* ORIGINAL SVG - DO NOT CHANGE */}
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
                                    d="M8.00016 5.5C6.61945 5.5..."
                                    fill=""
                                />
                            </svg>
                        </button>

                        <button
                            onClick={handleAddToCart}
                            className="inline-flex font-medium text-custom-sm py-[7px] px-5 rounded-[5px] bg-blue text-white ease-out duration-200 hover:bg-blue-dark"
                        >
                            Add to cart
                        </button>

                        <button
                            onClick={handleItemToWishList}
                            aria-label="button for favorite select"
                            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-blue"
                        >
                            {/* ORIGINAL SVG - DO NOT CHANGE */}
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
                                    d="M3.74949 2.94946..."
                                    fill=""
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* RIGHT SECTION */}
                <div className="w-full flex flex-col gap-5 sm:flex-row sm:items-center justify-center sm:justify-between py-5 px-4 sm:px-7.5 lg:pl-11 lg:pr-12">
                    <div>
                        <h3 className="font-medium text-dark ease-out duration-200 hover:text-blue mb-1.5">
                            <Link href={`/shop-details/${item.slug}`}>{item.title}</Link>
                        </h3>

                        <span className="flex items-center gap-2 font-medium text-lg">
              <span className="text-dark">
                {discountedPrice.toLocaleString()}₫
              </span>

                            {discountedPrice !== originalPrice && (
                                <span className="text-dark-4 line-through">
                  {originalPrice.toLocaleString()}₫
                </span>
                            )}
            </span>
                    </div>

                    {/* Reviews */}
                    <div className="flex items-center gap-2.5 mb-2">
                        <div className="flex items-center gap-1">

                            {/* Tạo số sao từ rating */}
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Image
                                    key={i}
                                    src="/images/icons/icon-star.svg"
                                    alt="star icon"
                                    width={15}
                                    height={15}
                                    className={i < Math.round(item.rating) ? "opacity-100" : "opacity-30"}
                                />
                            ))}
                        </div>

                        {/* Hiển thị số rating */}
                        <p className="text-custom-sm">({item.rating.toFixed(1)})</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleListItem;
