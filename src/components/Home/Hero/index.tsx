"use client";

import React from "react";
import HeroCarousel from "./HeroCarousel";
import Image from "next/image";

export default function Hero() {
    return (
        <section
            className="relative py-24 overflow-hidden"
            style={{ paddingTop: "calc(var(--header-height) + 30px)" }}
        >
            {/* BACKGROUND ÁNH SÁNG PREMIUM */}
            <div className="absolute inset-0 z-[1] pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f8fbff] via-[#ffffff] to-[#eef4ff]" />
                <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-blue-200 opacity-20 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-200 opacity-20 blur-[150px] rounded-full" />
            </div>

            {/* MAIN CONTENT */}
            <div className="relative z-[2] max-w-[1200px] mx-auto px-4 md:px-8 grid grid-cols-1 xl:grid-cols-3 gap-10">

                {/* LEFT SIDE – CAROUSEL */}
                <div className="xl:col-span-2">
                        <HeroCarousel />
                </div>

                {/* RIGHT SIDEBAR */}
                <div className="flex flex-col gap-8">

                    {/* Banner 1 */}
                    <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between hover:shadow-xl transition-all duration-300 border border-gray-100">
                        <div className="max-w-[60%]">
                            <p className="text-sm text-blue-600 font-semibold tracking-wide">Sách mới ra mắt</p>
                            <h2 className="text-lg font-bold text-gray-900 mt-2 leading-snug">
                                Tư Duy Nhanh Và Chậm
                            </h2>
                            <div className="flex items-center gap-3 mt-4">
                                <span className="text-xl text-red-600 font-bold">129.000₫</span>
                                <span className="text-gray-400 line-through text-lg">158.000₫</span>
                            </div>
                        </div>

                        <Image
                            src="/images/book/tu-duy-nhanh-va-cham.jpg"
                            alt="book"
                            width={120}
                            height={160}
                            className="rounded-lg shadow-md object-cover"
                        />
                    </div>

                    {/* Banner 2 */}
                    <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between hover:shadow-xl transition-all duration-300 border border-gray-100">
                        <div className="max-w-[60%]">
                            <p className="text-sm text-blue-600 font-semibold tracking-wide">Combo nổi bật</p>
                            <h2 className="text-lg font-bold text-gray-900 mt-2 leading-snug">
                                Combo 3 Cuốn Phát Triển Bản Thân
                            </h2>
                            <div className="flex items-center gap-3 mt-4">
                                <span className="text-xl text-red-600 font-bold">249.000₫</span>
                                <span className="text-gray-400 line-through text-lg">300.000₫</span>
                            </div>
                        </div>

                        <Image
                            src="/images/book/combo-3-cuon.png"
                            alt="combo"
                            width={120}
                            height={160}
                            className="rounded-lg shadow-md object-cover"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}
