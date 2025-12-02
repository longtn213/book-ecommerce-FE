"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ProductItem from "@/components/Common/ProductItem";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css";
import { fetchRelatedBook } from "@/services/bookService";
import { useParams } from "next/navigation";

const RelatedBookItems = () => {
    const sliderRef = useRef<any>(null);
    const params = useParams();
    const bookId = Number(params.id);

    const [items, setItems] = useState([]);
    const [open, setOpen] = useState(false);
    const [type, setType] = useState<"category" | "author" | "publisher">("category");

    const dropdownRef = useRef<HTMLDivElement | null>(null);

    // FETCH RELATED BOOKS
    useEffect(() => {
        if (!bookId) return;
        const load = async () => {
            const data = await fetchRelatedBook(bookId, type);
            setItems(data);
        };
        load();
    }, [bookId, type]);

    // CLICK OUTSIDE DROPDOWN
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Swiper navigation
    const handlePrev = useCallback(() => sliderRef.current?.swiper.slidePrev(), []);
    const handleNext = useCallback(() => sliderRef.current?.swiper.slideNext(), []);

    return (
        <section className="mt-20 pb-10">
            <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">

                {/* HEADER */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="font-semibold text-xl xl:text-2xl text-gray-900">
                            Sách liên quan
                        </h2>
                        <p className="text-gray-600 text-sm mt-1">
                            Các sách tương tự bạn có thể quan tâm
                        </p>
                    </div>

                    {/* DROPDOWN + NAVIGATION */}
                    <div className="flex items-center gap-4">

                        {/* Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setOpen(!open)}
                                className="
                                    flex items-center justify-between
                                    min-w-[150px]
                                    border border-gray-300 bg-white
                                    rounded-lg px-4 py-2 text-sm font-medium
                                    hover:border-blue-500 transition
                                "
                            >
                                {type === "category" && "Thể loại"}
                                {type === "author" && "Tác giả"}
                                {type === "publisher" && "Nhà xuất bản"}

                                <svg
                                    className={`ml-2 w-4 h-4 transition-transform ${
                                        open ? "rotate-180" : ""
                                    }`}
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M5.8 7.3a1 1 0 011.4 0L10 10.1l2.8-2.8a1 1 0 011.4 1.4l-3.5 3.5a1 1 0 01-1.4 0L5.8 8.7a1 1 0 010-1.4z"
                                    />
                                </svg>
                            </button>

                            {open && (
                                <div className="
                                    absolute right-0 top-12 w-48
                                    bg-white border rounded-xl shadow-lg
                                    z-50 overflow-hidden
                                ">
                                    {["category", "author", "publisher"].map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => {
                                                setType(t as any);
                                                setOpen(false);
                                            }}
                                            className="
                                                w-full text-left px-4 py-2 text-sm
                                                hover:bg-blue-50 hover:text-blue-600 transition
                                            "
                                        >
                                            {t === "category" && "Thể loại"}
                                            {t === "author" && "Tác giả"}
                                            {t === "publisher" && "Nhà xuất bản"}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* NAV BUTTONS */}
                        <button
                            onClick={handlePrev}
                            className="
                                w-10 h-10 flex items-center justify-center
                                rounded-full bg-white border border-gray-300 shadow-sm
                                hover:border-blue-500 hover:text-blue-600 transition
                            "
                        >
                            <svg
                                className="fill-current"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M15.4881 4.43057C15.8026 4.70014 15.839 5.17361 15.5694 5.48811L9.98781 12L15.5694 18.5119C15.839 18.8264 15.8026 19.2999 15.4881 19.5695C15.1736 19.839 14.7001 19.8026 14.4306 19.4881L8.43056 12.4881C8.18981 12.2072 8.18981 11.7928 8.43056 11.5119L14.4306 4.51192C14.7001 4.19743 15.1736 4.161 15.4881 4.43057Z"
                                />
                            </svg>
                        </button>

                        <button
                            onClick={handleNext}
                            className="
                                w-10 h-10 flex items-center justify-center
                                rounded-full bg-white border border-gray-300 shadow-sm
                                hover:border-blue-500 hover:text-blue-600 transition
                            "
                        >
                            <svg
                                className="fill-current"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M8.51192 4.43057C8.82641 4.161 9.29989 4.19743 9.56946 4.51192L15.5695 11.5119C15.8102 11.7928 15.8102 12.2072 15.5695 12.4881L9.56946 19.4881C9.29989 19.8026 8.82641 19.839 8.51192 19.5695C8.19743 19.2999 8.161 18.8264 8.43057 18.5119L14.0122 12L8.43057 5.48811C8.161 5.17361 8.19743 4.70014 8.51192 4.43057Z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* SWIPER */}
                <Swiper
                    ref={sliderRef}
                    slidesPerView={4}
                    spaceBetween={24}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        600: { slidesPerView: 2 },
                        900: { slidesPerView: 3 },
                        1200: { slidesPerView: 4 },
                    }}
                >
                    {items.map((item: any, key) => (
                        <SwiperSlide key={key}>
                            <ProductItem item={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default RelatedBookItems;
