"use client";
import React from "react";
import Image from "next/image";

const PromoBanner = () => {
    return (
        <section className="overflow-hidden py-20">
            <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">

                {/* MAIN BIG BANNER */}
                <div className="
          relative overflow-hidden rounded-3xl
          bg-gradient-to-r from-[#F5F2EC] to-[#ECE5D9]
          px-8 sm:px-14 lg:px-20
          py-14 lg:py-24 mb-14
          shadow-[0_8px_30px_rgba(0,0,0,0.08)]
          flex flex-col lg:flex-row items-center
        ">

                    {/* Left Text */}
                    <div className="relative z-20 max-w-[560px]">
            <span className="text-xl font-semibold text-gray-800 block mb-4">
              Bộ Sưu Tập Sách Mới 2025
            </span>

                        <h2 className="
              font-extrabold
              text-4xl lg:text-5xl xl:text-6xl
              leading-tight text-gray-900 mb-4
            ">
                            GIẢM ĐẾN <span className="text-blue-600">40%</span>
                            <br />
                            Sách Hot Nhất Năm
                        </h2>

                        <p className="text-gray-600 text-lg leading-relaxed">
                            Khám phá bộ sưu tập sách best-seller, kỹ năng, văn học và light novel
                            mới nhất. Ưu đãi độc quyền chỉ trong tháng này!
                        </p>

                        <a
                            href="/shop"
                            className="
                inline-flex mt-8
                px-12 py-3.5
                bg-blue-600 text-white
                font-semibold text-[16px]
                rounded-xl shadow-lg
                hover:bg-blue-700 transition-all duration-200
              "
                        >
                            Xem Ngay
                        </a>
                    </div>

                    {/* Image Right */}
                    <div className="absolute right-0 lg:right-10 bottom-20 lg:bottom-60 w-[480px] lg:w-[560px] drop-shadow-xl
            transition-transform duration-300 hover:scale-105">
                        <Image
                            src="/images/promo/book-promo-big.png"
                            width={560}
                            height={620}
                            alt="promo book"
                            className="object-contain pointer-events-none"
                        />
                    </div>
                </div>

                {/* SMALL BANNER GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                    {/* NEW RELEASE */}
                    <div className="
            relative rounded-3xl overflow-hidden
            bg-gradient-to-br from-[#DEF7F6] to-[#C4EFED]
            px-8 lg:px-14 py-14
            shadow-[0_8px_24px_rgba(0,0,0,0.06)]
          ">
                        {/* Image */}
                        <Image
                            src="/images/promo/book-new.png"
                            alt="new book"
                            width={330}
                            height={330}
                            className="
                absolute top-1/2 left-8 lg:left-14
                -translate-y-1/2 opacity-90
                transition-transform duration-300
                group-hover:scale-105
              "
                        />

                        {/* Text */}
                        <div className="relative z-20 text-right">
                            <span className="text-lg font-medium text-gray-700">Sách Mới Ra Mắt</span>

                            <h3 className="text-3xl font-bold text-gray-900 mt-1">
                                Ra Mắt Hôm Nay
                            </h3>

                            <p className="text-teal-600 font-semibold text-xl mt-2">
                                Giảm ngay 20%
                            </p>

                            <a
                                href="/shop"
                                className="
                  inline-flex mt-8 px-10 py-3
                  bg-teal-600 text-white
                  rounded-lg font-medium
                  shadow-md hover:bg-teal-700 transition
                "
                            >
                                Khám phá
                            </a>
                        </div>
                    </div>

                    {/* BEST SELLER */}
                    <div className="
            relative rounded-3xl overflow-hidden
            bg-gradient-to-br from-[#FFE5D2] to-[#FCD1B5]
            px-8 lg:px-14 py-14
            shadow-[0_8px_24px_rgba(0,0,0,0.06)]
          ">

                        {/* Image */}
                        <Image
                            src="/images/promo/book-bestseller.png"
                            alt="best seller"
                            width={330}
                            height={330}
                            className="
                absolute top-1/2 right-8 lg:right-14
                -translate-y-1/2 opacity-95
                transition-transform duration-300
                group-hover:scale-105
              "
                        />

                        {/* Text */}
                        <div className="relative z-20 max-w-[340px]">
                            <span className="text-lg font-medium text-gray-700">Sách Best-Seller</span>

                            <h3 className="text-3xl font-bold text-gray-900 mt-1">
                                Ưu Đãi Đến <span className="text-orange-600">35%</span>
                            </h3>

                            <p className="text-gray-700 text-base mt-2 leading-relaxed">
                                Tuyển chọn các tác phẩm được yêu thích nhất 2023–2025.
                            </p>

                            <a
                                href="/shop?sortType=1"
                                className="
                  inline-flex mt-8 px-10 py-3
                  bg-orange-500 text-white
                  rounded-lg font-medium
                  shadow-md hover:bg-orange-600 transition
                "
                            >
                                Mua Ngay
                            </a>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default PromoBanner;
