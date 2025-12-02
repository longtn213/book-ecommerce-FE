"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const CountDownBook = () => {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const deadline = "December 31, 2025 23:59:59";

    const getTime = () => {
        const time = Date.parse(deadline) - Date.now();
        if (time <= 0) return;

        setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
    };

    useEffect(() => {
        const interval = setInterval(getTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="overflow-hidden py-16">
            <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">

                {/* MAIN CARD */}
                <div className="relative rounded-2xl bg-[#F1EDE4] p-6 sm:p-10 lg:p-14 shadow-md overflow-hidden">

                    <div className="relative z-[2] max-w-[450px]">
                        {/* TITLE */}
                        <span className="block font-semibold text-blue text-sm sm:text-base tracking-wide mb-2">
              Flash Sale Cuối Năm 🎉
            </span>

                        <h2 className="font-bold text-dark text-2xl lg:text-4xl mb-3 leading-snug">
                            Giảm Đến 50% Toàn Bộ Sách
                        </h2>

                        <p className="text-gray-700 mb-6">
                            Hàng ngàn đầu sách best-seller, sách kỹ năng, truyện mới nhất đang chờ bạn.
                            Nhanh tay săn deal cực sốc giá rẻ nhất năm!
                        </p>

                        {/* COUNTDOWN */}
                        <div className="flex flex-wrap gap-5 mt-4">

                            {[
                                { label: "Days", value: days },
                                { label: "Hours", value: hours },
                                { label: "Minutes", value: minutes },
                                { label: "Seconds", value: seconds },
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col items-center text-center">
                  <span
                      className="w-16 h-16 text-2xl font-bold bg-white shadow-lg rounded-xl
                    flex items-center justify-center border border-gray-200"
                  >
                    {item.value < 10 ? "0" + item.value : item.value}
                  </span>
                                    <span className="text-sm text-gray-700 mt-1">{item.label}</span>
                                </div>
                            ))}

                        </div>

                        {/* BUTTON */}
                        <a
                            href="/shop?sortType=1"
                            className="inline-flex font-medium text-sm text-white bg-blue-600 py-3 px-8 rounded-lg hover:bg-blueCustom-dark transition mt-7 shadow-md"
                        >
                            Khám phá ngay!
                        </a>
                    </div>

                    {/* DECOR IMAGES (Không che chữ) */}
                    <Image
                        src="/images/countdown/countdown-bg.png"
                        alt="bg"
                        width={750}
                        height={450}
                        className="hidden sm:block absolute right-0 bottom-0 opacity-80 z-[1]"
                    />

                    <Image
                        src="/images/countdown/countdown-01.png"
                        alt="book"
                        width={650}
                        height={600}
                        className="hidden lg:block absolute right-6 bottom-25 z-[1] drop-shadow-xl"
                    />
                </div>
            </div>
        </section>
    );
};

export default CountDownBook;
