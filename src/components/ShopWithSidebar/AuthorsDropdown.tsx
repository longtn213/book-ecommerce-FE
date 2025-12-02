"use client";

import React, { useState } from "react";

const AuthorItem = ({ author, selectedId, onSelect }) => {
    const isSelected = String(selectedId) === String(author.id);

    const handleClick = () => {
        if (isSelected) {
            onSelect(""); // bỏ chọn
        } else {
            onSelect(author.id); // chọn
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`
        px-3.5 py-1.5 text-sm rounded-full border transition-all 
        ${
                isSelected
                    ? "border-blue-600 text-blue-600 bg-blue-50"
                    : "border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-400"
            }
      `}
        >
            {author.name}
        </button>
    );
};


const AuthorsDropdown = ({ authors, selectedId, onSelect }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {/* HEADER */}
            <div
                onClick={() => setOpen(!open)}
                className="cursor-pointer flex items-center justify-between py-3 px-5 border-b border-gray-100"
            >
                <p className="text-gray-900 font-medium">Authors</p>

                <button
                    className={`text-gray-600 transition-transform ${
                        open ? "rotate-180" : ""
                    }`}
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        className="fill-current"
                    >
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </button>
            </div>

            {/* TAGS AREA */}
            {open && (
                <div className="flex flex-wrap gap-2 px-5 py-4">
                    {authors.map((author) => (
                        <AuthorItem
                            key={author.id}
                            author={author}
                            selectedId={selectedId}
                            onSelect={onSelect}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AuthorsDropdown;
