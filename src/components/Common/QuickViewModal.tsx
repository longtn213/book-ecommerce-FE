"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { useAppSelector } from "@/redux/store";
import { useAuthContext } from "@/context/AuthContext";
import { useCart } from "@/hook/useCart";

/*
🔥 NEW FEATURES:
- Zoom ảnh
- Layout giống TIKI
- Thumbs giống Shopee
- Modal NẰM GIỮA cố định
*/

const QuickViewModal = () => {
    const { isModalOpen, closeModal } = useModalContext();
    const product = useAppSelector((state) => state.quickViewReducer.value);
    const { user, requireLogin } = useAuthContext();
    const { addToCart } = useCart();

    const [quantity, setQuantity] = useState(1);
    const [activePreview, setActivePreview] = useState(0);
    const [zoom, setZoom] = useState(false);

    const imgRef = useRef<HTMLImageElement | null>(null);
    useEffect(() => {
        if (isModalOpen) {
            setQuantity(1);
            setActivePreview(0);
            document.body.style.overflow = "hidden";

        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isModalOpen]);

    if (!isModalOpen) return null;

    // LOCK SCROLL WHEN MODAL OPEN



    return (
        <div className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 py-6"
            onClick={closeModal}
        >
            {/* MODAL */}
            <div
                className="
          quick-modal relative
          max-w-[1100px] w-full
          bg-white rounded-2xl shadow-2xl
          p-6 sm:p-10
          animate-fadeIn
        "
                onClick={(e) => e.stopPropagation()}
            >
                {/* CLOSE BTN */}
                <button
                    onClick={closeModal}
                    className="
            absolute top-4 right-4 md:top-6 md:right-6
            w-10 h-10 rounded-full
            bg-gray-100 hover:bg-gray-200
            flex items-center justify-center
            text-gray-700 text-xl
            transition shadow-sm
          "
                >
                    ✕
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                    {/* LEFT — IMAGE */}
                    <div>
                        <div className="flex gap-4">
                            {/* Thumbnails (Shopee Style) */}
                            <div className="flex flex-col gap-3">
                                {product.images?.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActivePreview(i)}
                                        className={`
                      w-20 h-20 rounded-lg overflow-hidden border 
                      flex items-center justify-center 
                      bg-gray-50 transition
                      hover:brightness-110
                      ${i === activePreview ? "border-blueCustom shadow" : "border-gray-200"}
                    `}
                                    >
                                        <Image
                                            src={img}
                                            alt="thumb"
                                            width={80}
                                            height={80}
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* MAIN IMAGE + ZOOM EFFECT */}
                            <div
                                className="
                  relative flex-1 bg-gray-50
                  rounded-xl border border-gray-300
                  overflow-hidden
                  cursor-zoom-in
                "
                                onMouseEnter={() => setZoom(true)}
                                onMouseLeave={() => setZoom(false)}
                                onMouseMove={(e) => {
                                    if (!imgRef.current) return;
                                    const { left, top, width, height } =
                                        e.currentTarget.getBoundingClientRect();
                                    const x = ((e.pageX - left) / width) * 100;
                                    const y = ((e.pageY - top) / height) * 100;
                                    imgRef.current.style.transformOrigin = `${x}% ${y}%`;
                                }}
                            >
                                <Image
                                    ref={imgRef}
                                    src={product.images?.[activePreview] || "/images/no-image.png"}
                                    alt="product"
                                    width={450}
                                    height={450}
                                    className={`
                    object-contain transition duration-200
                    ${zoom ? "scale-150 cursor-zoom-out" : "scale-100"}
                  `}
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT — INFO (Tiki Style) */}
                    <div className="flex flex-col">

                        {/* STATUS */}
                        <span
                            className={`
                inline-block px-3 py-1 rounded-md text-xs font-semibold mb-4 w-fit
                ${product.status === "OUT_OF_STOCK" ? "bg-red-500 text-white" : "bg-green-600 text-white"}
              `}
                        >
              {product.status === "OUT_OF_STOCK" ? "Hết hàng" : "Còn hàng"}
            </span>

                        {/* TITLE */}
                        <h1 className="text-[26px] font-bold text-gray-900 leading-snug mb-4">
                            {product.title}
                        </h1>

                        {/* RATING */}
                        <div className="flex items-center gap-3 mb-5">
                            <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Image
                                        key={i}
                                        src="/images/icons/icon-star.svg"
                                        width={18}
                                        height={18}
                                        className={i < Math.round(product.rating) ? "" : "opacity-25"}
                                        alt="star"
                                    />
                                ))}
                            </div>

                            <span className="text-gray-600 text-sm">
                {product.rating} ({product.reviewCount} đánh giá)
              </span>
                        </div>

                        {/* DESCRIPTION */}
                        <p className="text-gray-700 leading-relaxed mb-5">
                            {product.description}
                        </p>

                        {/* EXTRA INFO */}
                        <div className="space-y-1 text-sm text-gray-700 mb-6">
                            <p><b>Tác giả:</b> {product.authors?.join(", ")}</p>
                            <p><b>Thể loại:</b> {product.categories?.join(", ")}</p>
                            <p><b>ISBN:</b> {product.isbn}</p>
                            <p><b>Ngôn ngữ:</b> {product.language}</p>
                            <p><b>Số trang:</b> {product.pages}</p>
                            <p><b>Năm XB:</b> {product.publishYear}</p>
                            <p><b>NXB:</b> {product.publisherName}</p>
                            <p><b>Tồn kho:</b> {product.stockQuantity}</p>
                        </div>

                        {/* PRICE + QUANTITY */}
                        <div className="flex justify-between items-start gap-6 mb-8 flex-wrap">
                            {/* PRICE */}
                            <div>
                                <p className="text-gray-500 text-sm mb-1">Giá bán</p>
                                <div className="flex items-center gap-2">
                  <span className="text-[28px] font-bold text-red-600">
                    {product.price.toLocaleString()}₫
                  </span>
                                    <span className="line-through text-gray-400 text-lg">
                    {(product.price * 1.2).toLocaleString()}₫
                  </span>
                                </div>
                            </div>

                            {/* QUANTITY */}
                            <div>
                                <p className="text-gray-500 text-sm mb-1">Số lượng</p>
                                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                                        className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 text-xl"
                                    >
                                        -
                                    </button>

                                    <div className="w-12 h-10 flex items-center justify-center border-x border-gray-200">
                                        {quantity}
                                    </div>

                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 text-xl"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* ADD TO CART */}
                        <button
                            disabled={product.status === "OUT_OF_STOCK"}
                            onClick={() => {
                                if (!user) return requireLogin("thêm sản phẩm vào giỏ hàng");
                                addToCart(product.id, quantity);
                            }}
                            className={`
                w-full py-3 rounded-xl text-white font-semibold shadow-md transition 
                ${product.status === "OUT_OF_STOCK"
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blueCustom hover:bg-blueCustom-dark"}
              `}
                        >
                            {product.status === "OUT_OF_STOCK" ? "Sản phẩm tạm hết hàng" : "Thêm vào giỏ hàng"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default QuickViewModal;
