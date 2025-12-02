"use client";

import { useState } from "react";

const CategoryItem = ({ category, selectedId, onSelect }) => {
    const isSelected = String(selectedId) === String(category.id);
    const handleClick = () => {
        if (isSelected) {
            onSelect(""); // bỏ chọn
        } else {
            onSelect(category.id); // chọn
        }
    };
    return (
        <button
            onClick={handleClick}
            className={`flex items-center justify-between py-1.5 text-sm transition-all 
          ${isSelected ? "text-blue-600 font-medium" : "text-gray-700"} 
          hover:text-blue-600`}
        >
            <div className="flex items-center gap-2">
                {/* Custom Checkbox */}
                <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition
            ${
                        isSelected
                            ? "border-blue-600 bg-blue-600"
                            : "border-gray-300 bg-white"
                    }`}
                >
                    {isSelected && (
                        <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            className="text-white"
                        >
                            <path
                                d="M8.33317 2.5L3.74984 7.08333L1.6665 5"
                                stroke="white"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    )}
                </div>

                <span>{category.name}</span>
            </div>
        </button>
    );
};

const CategoryDropdown = ({ categories, selectedId, onSelect }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {/* HEADER */}
            <div
                onClick={() => setOpen(!open)}
                className="cursor-pointer flex items-center justify-between py-3 px-5 border-b border-gray-100"
            >
                <p className="text-gray-900 font-medium">Category</p>

                <button
                    className={`transition-transform text-gray-600 ${
                        open ? "rotate-180" : ""
                    }`}
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        className="fill-current"
                    >
                        <path d="M6.3 9.3L12 15l5.7-5.7"></path>
                    </svg>
                </button>
            </div>

            {/* CONTENT */}
            {open && (
                <div className="flex flex-col gap-2 py-4 px-5">
                    {categories.map((cat) => (
                        <CategoryItem
                            key={cat.id}
                            category={cat}
                            selectedId={selectedId}
                            onSelect={onSelect}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryDropdown;
