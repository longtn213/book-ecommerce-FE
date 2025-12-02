"use client";
import { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const PriceDropdown = ({ minPrice, maxPrice, onPriceChange }) => {
    const [open, setOpen] = useState(true);

    // Nếu chưa chọn thì default range
    const from = minPrice ?? 0;
    const to = maxPrice ?? 0;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">

            {/* HEADER */}
            <div
                onClick={() => setOpen(!open)}
                className="cursor-pointer flex items-center justify-between py-3 px-5 border-b border-gray-100"
            >
                <p className="text-gray-900 font-medium">Price</p>

                <button
                    className={`text-gray-600 transition-transform ${
                        open ? "rotate-180" : ""
                    }`}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" className="fill-current">
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </button>
            </div>

            {/* BODY */}
            {open && (
                <div className="p-5">
                    <div className="mb-5">
                        {/* SLIDER */}
                        <RangeSlider
                            min={0}
                            max={500000}
                            step={1000}
                            value={[from, to]}
                            onInput={([min, max]) => onPriceChange(min, max)}
                            className="w-full [&>*]:rounded-full [&>.range-slider__thumb]:bg-blue-600 [&>.range-slider__range]:bg-blue-300"
                        />
                    </div>

                    {/* MIN - MAX DISPLAY */}
                    <div className="flex items-center justify-between">
                        {/* MIN PRICE */}
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden text-sm text-gray-700">
                            <span className="px-2 py-1.5 bg-gray-100 border-r border-gray-300">₫</span>
                            <span className="px-3 py-1.5">{from.toLocaleString()}</span>
                        </div>

                        {/* MAX PRICE */}
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden text-sm text-gray-700">
                            <span className="px-2 py-1.5 bg-gray-100 border-r border-gray-300">₫</span>
                            <span className="px-3 py-1.5">{to.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PriceDropdown;
