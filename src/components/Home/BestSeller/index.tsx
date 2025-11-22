"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SingleItem from "./SingleItem";
import { fetchFeatureBook } from "@/services/bookService";

const BestSeller = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        async function loadData() {
            const res = await fetchFeatureBook("best-seller", 0, 6);
            setBooks(res?.content || []);
        }
        loadData();
    }, []);

    return (
        <section className="overflow-hidden">
            <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">

                {/* Header */}
                <div className="mb-10 flex items-center justify-between">
                    <div>
            <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
              <Image
                  src="/images/icons/icon-07.svg"
                  alt="icon"
                  width={17}
                  height={17}
              />
              This Month
            </span>
                        <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
                            Best Sellers
                        </h2>
                    </div>
                </div>

                {/* LIST */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7.5">
                    {books.map((item) => (
                        <SingleItem item={item} key={item.id} />
                    ))}
                </div>

                {/* View All */}
                <div className="text-center mt-12.5">
                    <Link
                        href="/shop?sortType=1"
                        className="inline-flex font-medium text-custom-sm py-3 px-7 sm:px-12.5 rounded-md border-gray-3 border bg-gray-1 text-dark ease-out duration-200 hover:bg-dark hover:text-white hover:border-transparent"
                    >
                        Xem tất cả
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BestSeller;
