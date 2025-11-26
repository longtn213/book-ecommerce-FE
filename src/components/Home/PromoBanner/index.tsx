import React from "react";
import Image from "next/image";

const PromoBanner = () => {
    return (
        <section className="overflow-hidden py-20">
            <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">

                {/* BIG PROMO BANNER */}
                <div className="relative overflow-hidden rounded-2xl bg-[#F1EDE4] px-6 sm:px-10 lg:px-16 py-14 lg:py-20 mb-10 shadow-[0_8px_24px_rgba(0,0,0,0.05)]">
                    <div className="max-w-[600px]">
            <span className="block text-xl font-medium text-dark mb-3">
              Bộ Sưu Tập Sách Mới 2025
            </span>

                        <h2 className="font-bold text-3xl lg:text-4xl xl:text-5xl text-dark leading-snug mb-4">
                            GIẢM ĐẾN 40% – <br className="hidden sm:block" />
                            Sách Hot Nhất Năm
                        </h2>

                        <p className="text-base text-gray-600 leading-relaxed max-w-[480px]">
                            Khám phá loạt sách best-seller, sách kỹ năng, văn học và light novel
                            mới nhất. Ưu đãi độc quyền chỉ áp dụng trong tháng này!
                        </p>

                        <a
                            href="/books"
                            className="inline-flex font-semibold text-white bg-blue rounded-md px-10 py-3 mt-8 text-[15px] hover:bg-blue-dark transition-all duration-200 shadow-md"
                        >
                            Xem Ngay
                        </a>
                    </div>

                    {/* IMAGE RIGHT */}
                    <Image
                        src="/images/promo/book-promo-big.png"
                        alt="promo big"
                        width={560}
                        height={620}
                        className="absolute bottom-20 right-10 lg:right-20 xl:right-8 z-0 object-contain"
                    />
                </div>

                {/* GRID PROMO SMALL */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* NEW RELEASE */}
                    <div className="relative overflow-hidden rounded-2xl bg-[#DBF4F3] px-6 sm:px-10 py-12 xl:py-16 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
                        <Image
                            src="/images/promo/book-new.png"
                            alt="Book New"
                            width={360}
                            height={360}
                            className="absolute top-1/2 -translate-y-1/2 left-6 sm:left-12 opacity-90"
                        />

                        <div className="text-right relative z-10">
                            <span className="block text-lg text-dark mb-1">Sách Mới Ra Mắt</span>

                            <h3 className="font-bold text-2xl text-dark mb-2">
                                Ra Mắt Hôm Nay
                            </h3>

                            <p className="font-semibold text-teal text-lg">Giảm ngay 20%</p>

                            <a
                                href="/books/new"
                                className="inline-flex font-medium text-white bg-teal px-8 py-2.5 rounded-md hover:bg-teal-dark mt-8 shadow"
                            >
                                Khám phá
                            </a>
                        </div>
                    </div>

                    {/* BEST SELLER */}
                    <div className="relative overflow-hidden rounded-2xl bg-[#FFECE1] px-6 sm:px-10 py-12 xl:py-16 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
                        <Image
                            src="/images/promo/book-bestseller.png"
                            alt="Book bestseller"
                            width={360}
                            height={360}
                            className="absolute top-1/2 -translate-y-1/2 right-6 opacity-95"
                        />

                        <div className="relative z-10 max-w-[320px]">
                            <span className="block text-lg text-dark mb-1.5">Sách Best-Seller</span>

                            <h3 className="font-bold text-2xl text-dark mb-3">
                                Ưu Đãi Đến <span className="text-orange">35%</span>
                            </h3>

                            <p className="text-sm text-gray-700">
                                Hàng loạt tác phẩm nổi tiếng, được yêu thích nhất suốt 2023–2025.
                            </p>

                            <a
                                href="/books/best-seller"
                                className="inline-flex font-medium text-white bg-orange px-8 py-2.5 rounded-md hover:bg-orange-dark mt-7 shadow"
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
