"use client";
import React, { useEffect, useState } from "react";

import { useModalContext } from "@/app/context/QuickViewModalContext";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import Image from "next/image";
import {useAuthContext} from "@/context/AuthContext";
import {useCart} from "@/hook/useCart";

const QuickViewModal = () => {
    const { isModalOpen, closeModal } = useModalContext();
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch<AppDispatch>();
    const { user, requireLogin } = useAuthContext();
    const { addToCart } = useCart();
    // product từ quickViewReducer
    const product = useAppSelector((state) => state.quickViewReducer.value);

    const [activePreview, setActivePreview] = useState(0);


    useEffect(() => {
        function handleClickOutside(event) {
            if (!event.target.closest(".modal-content")) {
                closeModal();
            }
        }

        if (isModalOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            setQuantity(1);
        };
    }, [isModalOpen, closeModal]);

    return (
        <div
            className={`${
                isModalOpen ? "z-99999" : "hidden"
            } fixed top-0 left-0 overflow-y-auto no-scrollbar w-full h-screen sm:py-20 xl:py-25 2xl:py-[230px] bg-dark/70 sm:px-8 px-4 py-5`}
        >
            <div className="flex items-center justify-center">
                <div className="w-full max-w-[1100px] rounded-xl shadow-3 bg-white p-7.5 relative modal-content">
                    {/* Close button */}
                    <button
                        onClick={closeModal}
                        className="absolute top-0 right-0 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-meta text-body hover:text-dark flex items-center justify-center"
                    >
                        ✕
                    </button>

                    <div className="flex flex-wrap items-center gap-12.5">
                        {/* LEFT IMAGE AREA */}
                        <div className="max-w-[526px] w-full">
                            <div className="flex gap-5">
                                {/* Small thumbnails */}
                                <div className="flex flex-col gap-5">
                                    {product.images?.map((img, key) => (
                                        <button
                                            key={key}
                                            onClick={() => setActivePreview(key)}
                                            className={`w-20 h-20 rounded-lg bg-gray-1 overflow-hidden flex items-center justify-center 
                      hover:border-2 hover:border-blue duration-200 
                      ${activePreview === key ? "border-2 border-blue" : ""}`}
                                        >
                                            <Image
                                                src={img}
                                                alt="thumbnail"
                                                width={61}
                                                height={61}
                                                className="aspect-square"
                                            />
                                        </button>
                                    ))}
                                </div>

                                {/* Main image - No preview zoom */}
                                <div className="relative flex items-center justify-center w-full sm:min-h-[508px] bg-gray-1 rounded-lg border border-gray-3">
                                    {product?.images?.[activePreview] ? (
                                        <Image
                                            src={product.images[activePreview]}
                                            alt="product"
                                            width={400}
                                            height={400}
                                        />
                                    ) : (
                                        <div className="w-[400px] h-[400px] flex items-center justify-center bg-gray-100 text-gray-400">
                                            No image
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT INFO AREA */}
                        <div className="max-w-[445px] w-full">
  <span className="inline-block text-custom-xs font-medium text-white py-1 px-3 bg-green mb-6.5">
    {product.status === "OUT_OF_STOCK" ? "HẾT HÀNG" : "SALE 20% OFF"}
  </span>

                            <h3 className="font-semibold text-xl xl:text-heading-5 text-dark mb-4">
                                {product.title}
                            </h3>

                            {/* rating */}
                            <div className="flex flex-wrap items-center gap-5 mb-6">
                                <div className="flex items-center gap-1.5">
                                    {/* giữ nguyên SVG */}
                                    <div className="flex items-center gap-1">
                                        {[1,2,3,4,5].map((s,i)=>(
                                            <svg
                                                key={i}
                                                className={i < product.rating ? "fill-[#FFA645]" : "fill-gray-4"}
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M16.7906 6.72187L11.7 5.93438L9.39377 1.09688C9.22502 0.759375 8.77502 0.759375 8.60627 1.09688L6.30002 5.9625L1.23752 6.72187C0.871891 6.77812 0.731266 7.25625 1.01252 7.50938L4.69689 11.3063L3.82502 16.6219C3.76877 16.9875 4.13439 17.2969 4.47189 17.0719L9.05627 14.5687L13.6125 17.0719C13.9219 17.2406 14.3156 16.9594 14.2313 16.6219L13.3594 11.3063L17.0438 7.50938C17.2688 7.25625 17.1563 6.77812 16.7906 6.72187Z" />
                                            </svg>
                                        ))}
                                    </div>

                                    <span>
        <span className="font-medium text-dark"> {product.rating} Rating </span>
        <span className="text-dark-2"> ({product.reviewCount} reviews) </span>
      </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M10 0.5625C4.78125 0.5625 0.5625 4.78125 0.5625 10C0.5625 15.2188 4.78125 19.4688 10 19.4688C15.2188 19.4688 19.4688 15.2188 19.4688 10C19.4688 4.78125 15.2188 0.5625 10 0.5625Z"
                                            fill={product.status === "OUT_OF_STOCK" ? "#ff2d2d" : "#22AD5C"}
                                        />
                                    </svg>

                                    <span className="font-medium text-dark">
        {product.status === "OUT_OF_STOCK" ? "Out of Stock" : "In Stock"}
      </span>
                                </div>
                            </div>

                            {/* DESCRIPTION */}
                            <p className="mb-3 text-dark">{product.description}</p>

                            {/* EXTRA INFO */}
                            <div className="space-y-1 text-sm text-dark mb-6">
                                <p><strong>Tác giả:</strong> {product.authors?.join(", ")}</p>
                                <p><strong>Thể loại:</strong> {product.categories?.join(", ")}</p>
                                <p><strong>ISBN:</strong> {product.isbn}</p>
                                <p><strong>Ngôn ngữ:</strong> {product.language}</p>
                                <p><strong>Số trang:</strong> {product.pages}</p>
                                <p><strong>Năm XB:</strong> {product.publishYear}</p>
                                <p><strong>NXB:</strong> {product.publisherName}</p>
                                <p><strong>Tồn kho:</strong> {product.stockQuantity}</p>
                            </div>

                            {/* PRICE + QUANTITY (UI original) */}
                            <div className="flex flex-wrap justify-between gap-5 mt-6 mb-7.5">
                                <div>
                                    <h4 className="font-semibold text-lg text-dark mb-3.5">Price</h4>
                                    <span className="flex items-center gap-2">
        <span className="font-semibold text-dark text-xl xl:text-heading-4">
          {product.price.toLocaleString()}₫
        </span>
        <span className="font-medium text-dark-4 text-lg xl:text-2xl line-through">
          {(product.price * 1.2).toLocaleString()}₫
        </span>
      </span>
                                </div>

                                {/* quantity giữ nguyên UI */}
                                <div>
                                    <h4 className="font-semibold text-lg text-dark mb-3.5">Quantity</h4>

                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                                            className="flex items-center justify-center w-10 h-10 rounded-[5px] bg-gray-2 text-dark hover:text-blue"
                                        >
                                            -
                                        </button>

                                        <span className="flex items-center justify-center w-20 h-10 rounded-[5px] border border-gray-4 bg-white font-medium text-dark">
          {quantity}
        </span>

                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="flex items-center justify-center w-10 h-10 rounded-[5px] bg-gray-2 text-dark hover:text-blue"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* BUTTON */}
                            <button
                                disabled={product.status === "OUT_OF_STOCK"}
                                className={`inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md ease-out duration-200 hover:bg-blue-dark ${
                                    product.status === "OUT_OF_STOCK" ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                                onClick={() => {
                                    if (!user) return requireLogin("thêm sản phẩm vào giỏ hàng");
                                    addToCart(product.id, quantity);
                                }}
                            >
                                Add to Cart
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default QuickViewModal;
