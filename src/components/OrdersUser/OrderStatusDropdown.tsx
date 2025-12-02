"use client";

import { useState, useRef, useEffect } from "react";

const STATUS_OPTIONS = [
    { label: "Tất cả", value: "" },
    { label: "Chờ xác nhận", value: "PENDING" },
    { label: "Đã thanh toán", value: "PAID" },
    { label: "Đang giao hàng", value: "SHIPPING" },
    { label: "Hoàn tất", value: "COMPLETED" },
    { label: "Đã hủy", value: "CANCELLED" },
];

export const OrderStatusDropdown = ({ value, onChange }: any) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedLabel =
        STATUS_OPTIONS.find((s) => s.value === value)?.label || "Tất cả";

    // CLICK OUTSIDE -> CLOSE DROPDOWN
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
        <div ref={dropdownRef} className="relative inline-block text-left select-none">

            {/* BUTTON */}
            <button
                className="flex items-center justify-between w-48 px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm
                   hover:border-blue-500 transition-all focus:ring-2 focus:ring-blue-500 shadow-sm"
                onClick={() => setOpen(!open)}
            >
                <span className="font-medium text-gray-700">{selectedLabel}</span>

                <svg
                    className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                        open ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* DROPDOWN */}
            {open && (
                <div
                    className="absolute left-0 z-20 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1
                     animate-fadeIn origin-top"
                >
                    {STATUS_OPTIONS.map((s) => (
                        <div
                            key={s.value}
                            onClick={() => {
                                onChange(s.value);
                                setOpen(false);
                            }}
                            className={`px-4 py-2 text-sm cursor-pointer transition 
                hover:bg-gray-100 
                ${
                                value === s.value
                                    ? "text-blue-600 font-medium"
                                    : "text-gray-700"
                            }`}
                        >
                            {s.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
