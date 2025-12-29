"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";

export default function HeroCarousel() {
    return (
        <Swiper
            spaceBetween={40}
            centeredSlides={true}
            autoplay={{ delay: 3500 }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            className="hero-carousel"
        >

            {/* SLIDE 1 — Nhà Giả Kim */}
            <SwiperSlide>
                <div className="
                    flex flex-col md:flex-row items-center gap-14
                    p-10 rounded-3xl bg-gradient-to-r from-[#e9f4ff] to-white
                    border border-[#d2e6ff] shadow-md
                ">

                    {/* LEFT TEXT */}
                    <div className="flex flex-col max-w-[460px] flex-1">

                        <span className="
                            inline-block bg-[#007bff] text-white
                            px-5 py-1.5 rounded-full text-xs font-semibold mb-3
                        ">
                            DEAL HOT • GIẢM 30%
                        </span>

                        <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                            Bộ Sách “Nhà Giả Kim”
                            <span className="text-[#007bff]"> – Bestseller Toàn Cầu</span>
                        </h1>

                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            Quyển sách truyền cảm hứng mạnh mẽ giúp bạn hiểu mình hơn và theo đuổi ước mơ đến cùng.
                        </p>

                        <Link href="/shop" className="w-max">
                            <button className="
        bg-[#007bff] hover:bg-[#0064d1] text-white
        px-10 py-3 text-lg rounded-xl shadow-md transition
    ">
                                Mua Ngay
                            </button>
                        </Link>

                    </div>

                    {/* IMAGE */}
                    <Image
                        src="/images/book/nha_gia_kim.jpg"
                        alt="book"
                        width={420}
                        height={420}
                        className="rounded-3xl shadow-xl border border-white/70 object-cover"
                    />
                </div>
            </SwiperSlide>

            {/* SLIDE 2 — Thói Quen Nguyên Tử */}
            <SwiperSlide>
                <div className="
                    flex flex-col md:flex-row items-center gap-14
                    p-10 rounded-3xl bg-gradient-to-r from-white to-[#e9f3ff]
                    border border-[#d2e6ff] shadow-md
                ">

                    {/* TEXT */}
                    <div className="flex flex-col max-w-[460px] flex-1">
                        <span className="
                            inline-block bg-[#ff7a00] text-white
                            px-5 py-1.5 rounded-full text-xs font-semibold mb-3
                        ">
                            BESTSELLER
                        </span>

                        <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                            Thói Quen Nguyên Tử
                            <span className="text-[#007bff]"> – Thành Công Bền Vững</span>
                        </h1>

                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            Cuốn sách giúp thay đổi tư duy, hình thành thói quen tốt và nâng cao chất lượng cuộc sống.
                        </p>

                        <Link href="/shop" className="w-max">
                            <button className="
        bg-[#007bff] hover:bg-[#0064d1] text-white
        px-10 py-3 text-lg rounded-xl shadow-md transition
    ">
                                Xem Chi Tiết
                            </button>
                        </Link>

                    </div>

                    {/* IMAGE */}
                    <Image
                        src="/images/book/thoi-quen-nguyen-tu.jpg"
                        alt="book"
                        width={420}
                        height={420}
                        className="rounded-3xl shadow-xl border border-white/70 object-cover"
                    />
                </div>
            </SwiperSlide>

        </Swiper>
    );
}
