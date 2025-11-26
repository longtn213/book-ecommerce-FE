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
    const sliderRef = useRef(null);
    const params = useParams();
    const bookId = Number(params.id);
    const [open, setOpen] = useState(false);

    const [type, setType] = useState<"category" | "author" | "publisher">("category");
    const [items, setItems] = useState([]);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    // FETCH RELATED BOOKS
    useEffect(() => {
        if (!bookId) return;

        const load = async () => {
            const data = await fetchRelatedBook(bookId, type);
            setItems(data);
        };

        load();
    }, [bookId, type]);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <section className="overflow-hidden pt-17.5">
            <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 pb-15 border-b border-gray-3">
                <div className="swiper categories-carousel common-carousel">
                    {/* <!-- section title --> */}
                    <div className="mb-10 flex items-center justify-between">
                        <div>
              <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
                <Image
                    src="/images/icons/icon-05.svg"
                    width={17}
                    height={17}
                    alt="icon"
                />
                Related Books
              </span>
                            <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
                                Sách liên quan
                            </h2>
                        </div>

                        {/* 🔥 DROPDOWN NEW (Không sửa UI) */}
                        <div className="flex items-center gap-3">

                            {/* CUSTOM SELECT */}
                            <div className="relative" ref={dropdownRef}>
                            <button
                                    onClick={() => setOpen(!open)}
                                    className="
            flex items-center justify-between
            min-w-[150px]
            bg-white border border-gray-300
            rounded-lg px-4 py-2 text-sm font-medium
            hover:border-blue-500
            transition-all
            focus:outline-none
        "
                                >
                                    {type === "category" && "Thể loại"}
                                    {type === "author" && "Tác giả"}
                                    {type === "publisher" && "Nhà xuất bản"}

                                    <svg
                                        className={`ml-2 w-4 h-4 transition-transform duration-200 ${
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

                                {/* Dropdown menu */}
                                {open && (
                                    <div
                                        className="
                absolute right-0 top-12
                w-48 bg-white shadow-lg border
                rounded-xl z-50 animate-fade-in
            "
                                    >
                                        <button
                                            onClick={() => {
                                                setType("category");
                                                setOpen(false);
                                            }}
                                            className="
                    w-full text-left px-4 py-2 text-sm
                    hover:bg-blue-50 hover:text-blue-600
                    transition
                "
                                        >
                                            Thể loại
                                        </button>

                                        <button
                                            onClick={() => {
                                                setType("author");
                                                setOpen(false);
                                            }}
                                            className="
                    w-full text-left px-4 py-2 text-sm
                    hover:bg-blue-50 hover:text-blue-600
                    transition
                "
                                        >
                                            Tác giả
                                        </button>

                                        <button
                                            onClick={() => {
                                                setType("publisher");
                                                setOpen(false);
                                            }}
                                            className="
                    w-full text-left px-4 py-2 text-sm
                    hover:bg-blue-50 hover:text-blue-600
                    transition
                "
                                        >
                                            Nhà xuất bản
                                        </button>
                                    </div>
                                )}
                            </div>

                            <button onClick={handlePrev} className="
        w-9 h-9 flex items-center justify-center
        border border-gray-300
        rounded-lg bg-white
        hover:border-blue-500 hover:text-blue-600
        transition
    ">
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

                            <button onClick={handleNext} className="
        w-9 h-9 flex items-center justify-center
        border border-gray-300
        rounded-lg bg-white
        hover:border-blue-500 hover:text-blue-600
        transition
    ">
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

                    <Swiper
                        ref={sliderRef}
                        slidesPerView={4}
                        spaceBetween={20}
                        className="justify-between"
                    >
                        {items.map((item: any, key) => (
                            <SwiperSlide key={key}>
                                <ProductItem item={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default RelatedBookItems;
