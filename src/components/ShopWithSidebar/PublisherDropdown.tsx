"use client";

import React, { useState } from "react";

const PublisherItem = ({ publisher, selectedId, onSelect }) => {
    const isSelected = String(selectedId) === String(publisher.id);

    const handleClick = () => {
        if (isSelected) {
            onSelect(""); // bỏ chọn
        } else {
            onSelect(publisher.id);
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`flex items-center gap-2 py-1.5 text-sm transition-all 
        ${isSelected ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}
      `}
        >
            {/* Checkbox Styled */}
            <div
                className={`w-4 h-4 rounded border flex items-center justify-center transition
          ${
                    isSelected
                        ? "bg-blue-600 border-blue-600"
                        : "bg-white border-gray-300"
                }
        `}
            >
                {isSelected && (
                    <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                    >
                        <path
                            d="M8.33317 2.5L3.74984 7.08333L1.6665 5"
                            stroke="white"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </div>

            <span>{publisher.name}</span>
        </button>
    );
};

const PublisherDropdown = ({ publishers, selectedId, onSelect }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">

            {/* HEADER */}
            <div
                onClick={() => setOpen(!open)}
                className="cursor-pointer flex items-center justify-between py-3 px-5 border-b border-gray-100"
            >
                <p className="text-gray-900 font-medium">Publisher</p>

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

            {/* CONTENT */}
            {open && (
                <div className="flex flex-col gap-3 px-5 py-4">
                    {publishers.map((publisher) => (
                        <PublisherItem
                            key={publisher.id}
                            publisher={publisher}
                            selectedId={selectedId}
                            onSelect={onSelect}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PublisherDropdown;
