"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";

const Breadcrumb = ({ title, pages = [] }) => {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const header = document.querySelector("header");
        if (!header) return;

        const updateHeight = () => {
            const h = header.getBoundingClientRect().height;
            setOffset(h);
        };

        updateHeight();

        // Update on window resize
        window.addEventListener("resize", updateHeight);

        // Update on scroll (vì header sticky có thể thay đổi height)
        window.addEventListener("scroll", updateHeight);

        return () => {
            window.removeEventListener("resize", updateHeight);
            window.removeEventListener("scroll", updateHeight);
        };
    }, []);

    return (
        <div
            className="w-full bg-gray-50 border-b border-gray-200 py-6 transition-all"
            style={{ marginTop: offset }}
        >
            <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">

                {/* Title */}
                <h1 className="font-semibold text-dark text-xl sm:text-2xl xl:text-3xl mb-3">
                    {title}
                </h1>

                {/* Breadcrumb items */}
                <ul className="flex items-center text-sm text-gray-600 gap-1">
                    <li className="flex items-center">
                        <Link href="/" className="hover:text-blue-600 transition">
                            Trang chủ
                        </Link>
                    </li>

                    {pages.length > 0 && (
                        <li className="text-gray-400">
                            <ChevronRight size={16} />
                        </li>
                    )}

                    {pages.map((page, index) => (
                        <React.Fragment key={index}>
                            <li
                                className={`capitalize ${
                                    index === pages.length - 1
                                        ? "text-blue-600 font-medium"
                                        : "hover:text-blue-600"
                                }`}
                            >
                                {page}
                            </li>

                            {index < pages.length - 1 && (
                                <li className="text-gray-400">
                                    <ChevronRight size={16} />
                                </li>
                            )}
                        </React.Fragment>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Breadcrumb;
