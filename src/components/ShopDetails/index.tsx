"use client";

import React, {useEffect, useState} from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Image from "next/image";
import Newsletter from "../Common/Newsletter";
import RelatedBookItems from "./RelatedBook";
import {AppDispatch, useAppSelector} from "@/redux/store";
import {setActiveIndex} from "@/redux/features/product-details";
import {useDispatch} from "react-redux";

import {Product} from "@/types/product";
import {useAuthContext} from "@/context/AuthContext";
import {useCart} from "@/hook/useCart";
import {useWishlist} from "@/hook/useWishlist";

// ICONS – LUCIDE
import {Heart, Minus, Plus, ShoppingCart} from "lucide-react";
import {useParams} from "next/navigation";
import {fetchBookById} from "@/services/bookService";

const ShopDetailsUI = () => {
        const params = useParams();
        const id = Number(params.id);

        const [product, setProduct] = useState<Product | null>(null);
        const [loading, setLoading] = useState(true);

        const dispatch = useDispatch<AppDispatch>();
        const { activeIndex } = useAppSelector(
            (state) => state.productDetailsReducer
        );

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
                } finally {
                    setLoading(false);
                }
            };

            if (id) loadBook();
        }, [id]);

        if (loading)
            return <p className="p-10 text-center">Đang tải dữ liệu...</p>;

        if (!product)
            return <p className="p-10 text-center">Không tìm thấy sách</p>;

    const handleAddToCart = () => {
        if (!user) return requireLogin("thêm sản phẩm vào giỏ hàng");
        addToCart(product.id, quantity);
    };


    return (
        <>
            <Breadcrumb title="Chi tiết sách" pages={["Chi tiết sách"]} />

            <section className="pb-20 pt-5 lg:pt-10">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
                    <div className="flex flex-col lg:flex-row gap-10">

                        {/* LEFT GALLERY */}
                        <div className="flex gap-4">
                            {/* Thumbnail list */}
                            <div className="flex flex-col gap-3">
                                {product.images.map((url, index) => (
                                    <button
                                        key={index}
                                        onClick={() => dispatch(setActiveIndex(index))}
                                        className={`border rounded-md overflow-hidden ${
                                            activeIndex === index
                                                ? "border-blue-500"
                                                : "border-gray-300"
                                        }`}
                                    >
                                        <Image
                                            src={url}
                                            width={70}
                                            height={70}
                                            alt="thumbnail"
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* Main image */}
                            <div className="rounded-lg shadow bg-gray-100 p-4 flex items-center justify-center relative min-h-[500px] w-[400px]">
                                <Image
                                    src={product.images[activeIndex]}
                                    width={420}
                                    height={420}
                                    alt={product.title}
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        {/* RIGHT CONTENT */}
                        <div className="flex-1 max-w-[550px]">

                            {/* Title */}
                            <h2 className="text-3xl font-semibold text-dark mb-3">
                                {product.title}
                            </h2>

                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex items-center gap-1">
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Image
                                                key={i}
                                                src="/images/icons/icon-star.svg"
                                                alt="star"
                                                width={24}
                                                height={24}
                                                className={i < Math.round(product.rating) ? "" : "opacity-30"}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500">
                                    ({product.reviewCount} đánh giá)
                                </span>
                            </div>

                            {/* Price */}
                            <h3 className="text-xl font-medium mb-4">
                                Giá:{" "}
                                <span className="text-blue font-bold text-2xl">
                                    {product.price.toLocaleString()} đ
                                </span>
                            </h3>

                            {/* ACTION BLOCK (TIKI STYLE) */}
                            <div className="flex flex-col gap-4 mb-6">

                                {/* Quantity */}
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-9 h-9 flex items-center justify-center border border-gray-400 rounded hover:bg-gray-100"
                                    >
                                        <Minus size={18} />
                                    </button>

                                    <div className="px-5 py-2 border border-gray-400 rounded text-lg min-w-[50px] text-center">
                                        {quantity}
                                    </div>

                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-9 h-9 flex items-center justify-center border border-gray-400 rounded hover:bg-gray-100"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>

                                {/* Add to cart + wishlist */}
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={handleAddToCart}
                                        className="px-8 py-3 bg-blue text-white rounded-md font-semibold text-[15px]
                                        hover:bg-blue-dark min-w-[200px] shadow-sm flex items-center gap-2"
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
                                                coverUrl: product.images?.[0] || ""
                                            })
                                        }
                                        className={`w-12 h-12 flex items-center justify-center rounded-md border shadow-sm text-[20px]
                                            hover:bg-gray-100 ${
                                            isWishlisted(product.id)
                                                ? "text-red-500"
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
                            <ul className="flex flex-col gap-2 text-dark text-base mb-5 leading-relaxed">
                                <li><strong>Nhà xuất bản:</strong> {product.publisherName}</li>
                                <li><strong>Tác giả:</strong> {product.authors.join(", ")}</li>
                                <li><strong>Thể loại:</strong> {product.categories.join(", ")}</li>
                                <li><strong>Ngôn ngữ:</strong> {product.language}</li>
                                <li><strong>Năm xuất bản:</strong> {product.publishYear}</li>
                                <li><strong>ISBN:</strong> {product.isbn}</li>
                                <li><strong>Số trang:</strong> {product.pages}</li>
                                <li><strong>Trạng thái:</strong> {product.status}</li>
                                <li><strong>Tồn kho:</strong> {product.stockQuantity} sản phẩm</li>
                            </ul>

                            {/* Description */}
                            <div className="mt-6">
                                <h3 className="font-medium text-lg mb-2">Mô tả:</h3>
                                <p className="text-dark leading-relaxed">
                                    {product.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <RelatedBookItems />
            <Newsletter />
        </>
    );
};

export default ShopDetailsUI;
