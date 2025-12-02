"use client";

import React, { useEffect, useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Image from "next/image";
import Newsletter from "../Common/Newsletter";
import RelatedBookItems from "./RelatedBook";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { setActiveIndex } from "@/redux/features/product-details";
import { useDispatch } from "react-redux";

import { Book } from "@/types/book";
import { useAuthContext } from "@/context/AuthContext";
import { useCart } from "@/hook/useCart";
import { useWishlist } from "@/hook/useWishlist";

import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { useParams } from "next/navigation";
import { fetchBookById } from "@/services/bookService";
import ReviewSection from "@/app/(site)/(pages)/shop-details/ReviewSection";
import UserReviewSection from "@/app/(site)/(pages)/shop-details/UserReviewSection";

const ShopDetailsUI = () => {
    const params = useParams();
    const id = Number(params.id);

    const [product, setProduct] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch<AppDispatch>();
    const { activeIndex } = useAppSelector((state) => state.productDetailsReducer);

    const { user, requireLogin } = useAuthContext();
    const { addToCart } = useCart();
    const { isWishlisted, toggle } = useWishlist();

    const [quantity, setQuantity] = useState<number>(1);

    // fetch book when entering the page
    useEffect(() => {
        const loadBook = async () => {
            try {
                const data = await fetchBookById(id);
                setProduct(data);
                // reset thumbnail về ảnh đầu tiên khi chuyển sách
                dispatch(setActiveIndex(0));
            } finally {
                setLoading(false);
            }
        };

        if (id) loadBook();
    }, [id, dispatch]);

    if (loading) return <p className="p-10 text-center">Đang tải dữ liệu...</p>;
    if (!product) return <p className="p-10 text-center">Không tìm thấy sách</p>;

    // bảo vệ khi thiếu ảnh / index vượt quá
    const images =
        product.images && product.images.length > 0
            ? product.images
            : ["/images/default-book.png"];

    const safeIndex =
        activeIndex >= 0 && activeIndex < images.length ? activeIndex : 0;

    const handleAddToCart = () => {
        if (!user) return requireLogin("thêm sản phẩm vào giỏ hàng");
        addToCart(product.id, quantity);
    };

    return (
        <>
            <Breadcrumb title="Chi tiết sách" pages={["Chi tiết sách"]} />

            {/* MAIN PRODUCT AREA */}
            <section className="pb-16 pt-5 lg:pt-8 bg-gray-1">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 lg:p-7 flex flex-col lg:flex-row gap-8 lg:gap-10">
                        {/* LEFT GALLERY */}
                        <div className="flex flex-col sm:flex-row gap-4 lg:w-[420px]">
                            {/* Thumbnails */}
                            <div className="flex sm:flex-col gap-3 sm:max-h-[420px] sm:overflow-y-auto">
                                {images.map((url, index) => (
                                    <button
                                        key={index}
                                        onClick={() => dispatch(setActiveIndex(index))}
                                        className={`border rounded-lg overflow-hidden bg-gray-50 w-[64px] h-[90px] flex items-center justify-center transition
                      ${
                                            safeIndex === index
                                                ? "border-blue-500 ring-2 ring-blue/30"
                                                : "border-gray-200 hover:border-blue-600"
                                        }`}
                                    >
                                        <Image
                                            src={url}
                                            width={70}
                                            height={90}
                                            alt="thumbnail"
                                            className="object-contain"
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* Main image */}
                            <div className="flex-1 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center min-h-[360px] lg:min-h-[420px]">
                                <Image
                                    src={images[safeIndex]}
                                    width={320}
                                    height={420}
                                    alt={product.title}
                                    className="object-contain max-h-[420px]"
                                />
                            </div>
                        </div>

                        {/* RIGHT CONTENT */}
                        <div className="flex-1">
                            {/* Title */}
                            <h1 className="text-2xl lg:text-3xl font-semibold text-darkCustom mb-2">
                                {product.title}
                            </h1>

                            {/* Author line */}
                            {product.authors?.length > 0 && (
                                <p className="text-sm text-gray-500 mb-3">
                                    Tác giả:{" "}
                                    <span className="text-blue-600">
                    {product.authors.join(", ")}
                  </span>
                                </p>
                            )}

                            {/* Rating */}
                            <div className="flex items-center gap-3 mb-3">
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Image
                                            key={i}
                                            src="/images/icons/icon-star.svg"
                                            alt="star"
                                            width={18}
                                            height={18}
                                            className={
                                                i < Math.round(product.rating) ? "" : "opacity-30"
                                            }
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600">
                  {product.rating.toFixed(1)} • {product.reviewCount} đánh giá
                </span>
                            </div>

                            {/* Price */}
                            <div className="mb-4 flex items-end gap-2">
                                <span className="text-sm text-gray-500">Giá bán</span>
                                <p className="text-2xl font-bold text-blue-600">
                                    {product.price.toLocaleString()} đ
                                </p>
                            </div>

                            {/* Small info badges (kiểu Tiki) */}
                            <div className="flex flex-wrap gap-2 mb-5 text-xs">
                <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
                  Còn {product.stockQuantity} sản phẩm
                </span>
                                <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                  Nhà XB: {product.publisherName}
                </span>
                                {product.publishYear && (
                                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                    Năm XB: {product.publishYear}
                  </span>
                                )}
                            </div>

                            {/* ACTION BLOCK */}
                            <div className="flex flex-col gap-4 mb-7">
                                {/* Quantity */}
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-gray-600">Số lượng</span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() =>
                                                setQuantity((q) => Math.max(1, q - 1))
                                            }
                                            disabled={quantity <= 1}
                                            className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            <Minus size={18} />
                                        </button>

                                        <div className="px-5 py-2 border border-gray-300 rounded-lg text-base min-w-[56px] text-center bg-white">
                                            {quantity}
                                        </div>

                                        <button
                                            onClick={() => setQuantity((q) => q + 1)}
                                            className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50"
                                        >
                                            <Plus size={18} />
                                        </button>
                                    </div>
                                </div>

                                {/* Add to cart + Wishlist */}
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={handleAddToCart}
                                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg text-sm lg:text-base font-semibold hover:bg-blueCustom-dark shadow-sm"
                                    >
                                        <ShoppingCart size={18} />
                                        Thêm vào giỏ hàng
                                    </button>

                                    <button
                                        onClick={() =>
                                            toggle({
                                                id: product.id,
                                                title: product.title,
                                                authorName: product.authors?.join(", ") || "",
                                                price: product.price,
                                                coverUrl: product.images?.[0] || "",
                                            })
                                        }
                                        className={`w-11 h-11 flex items-center justify-center rounded-full border border-gray-300 shadow-sm hover:bg-gray-50
                      ${
                                            isWishlisted(product.id)
                                                ? "text-red-500 border-red-300"
                                                : "text-gray-600"
                                        }`}
                                    >
                                        <Heart
                                            size={22}
                                            className={
                                                isWishlisted(product.id)
                                                    ? "fill-red-500 text-red-500"
                                                    : ""
                                            }
                                        />
                                    </button>
                                </div>
                            </div>

                            {/* Metadata */}
                            <div className="border-t border-gray-200 pt-4 mt-2">
                                <h3 className="font-semibold mb-3 text-gray-800">
                                    Thông tin chi tiết
                                </h3>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm text-gray-800">
                                    <li>
                                        <span className="text-gray-500">Nhà xuất bản:</span>{" "}
                                        {product.publisherName}
                                    </li>
                                    <li>
                                        <span className="text-gray-500">Tác giả:</span>{" "}
                                        {product.authors.join(", ")}
                                    </li>
                                    <li>
                                        <span className="text-gray-500">Thể loại:</span>{" "}
                                        {product.categories.join(", ")}
                                    </li>
                                    <li>
                                        <span className="text-gray-500">Ngôn ngữ:</span>{" "}
                                        {product.language}
                                    </li>
                                    <li>
                                        <span className="text-gray-500">Năm xuất bản:</span>{" "}
                                        {product.publishYear}
                                    </li>
                                    <li>
                                        <span className="text-gray-500">ISBN:</span> {product.isbn}
                                    </li>
                                    <li>
                                        <span className="text-gray-500">Số trang:</span>{" "}
                                        {product.pages}
                                    </li>
                                    <li>
                                        <span className="text-gray-500">Trạng thái:</span>{" "}
                                        {product.status}
                                    </li>
                                </ul>
                            </div>

                            {/* Description */}
                            {product.description && (
                                <div className="border-t border-gray-200 pt-4 mt-5">
                                    <h3 className="font-semibold mb-2 text-gray-800">Mô tả</h3>
                                    <p className="text-sm leading-relaxed text-gray-800 whitespace-pre-line">
                                        {product.description}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* REVIEW CỦA USER + REVIEW CHUNG + SÁCH LIÊN QUAN + NEWSLETTER */}
            <UserReviewSection bookId={product.id} />
            <ReviewSection bookId={product.id} />
            <RelatedBookItems />
            <Newsletter />
        </>
    );
};

export default ShopDetailsUI;
