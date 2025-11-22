"use client";

import { useEffect, useRef, useState } from "react";

const CustomSelect = ({ options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const selectRef = useRef(null);

    // ⭐ Khi value từ ngoài thay đổi → cập nhật option đang chọn
    useEffect(() => {
        if (value != null) {
            const match = options.find((opt) => String(opt.value) === String(value));
            if (match) setSelectedOption(match);
        } else {
            setSelectedOption(options[0]); // fallback
        }
    }, [value, options]);

    // CLOSE DROPDOWN WHEN CLICK OUTSIDE
    useEffect(() => {
        function handleClickOutside(e) {
            if (selectRef.current && !selectRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);

        // Truyền value ra ngoài
        onChange?.(option.value);
    };

    return (
        <div className="custom-select custom-select-2 flex-shrink-0 relative" ref={selectRef}>
            <div
                className={`select-selected whitespace-nowrap ${
                    isOpen ? "select-arrow-active" : ""
                }`}
                onClick={toggleDropdown}
            >
                {selectedOption?.label}
            </div>

            <div className={`select-items ${isOpen ? "" : "select-hide"}`}>
                {options.map((option, index) => (
                    <div
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        className={`select-item ${
                            selectedOption?.value === option.value ? "same-as-selected" : ""
                        }`}
                    >
                        {option.label}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomSelect;
