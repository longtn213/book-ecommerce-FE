import React, { useState, useEffect } from "react";

interface Option {
    label: string;
    value: string;
}

interface CustomSelectProps {
    options: Option[];
    value?: string;               // ⭐ giá trị được truyền từ Header
    onChange?: (value: string) => void; // ⭐ gửi value ra ngoài
}

const CustomSelect: React.FC<CustomSelectProps> = ({
                                                       options = [],
                                                       value,
                                                       onChange,
                                                   }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    // ⭐ Cập nhật selectedOption khi props.value thay đổi
    useEffect(() => {
        if (options.length > 0) {
            const found = options.find((o) => o.value === value) || options[0];
            setSelectedOption(found);
        }
    }, [options, value]);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleOptionClick = (option: Option) => {
        setSelectedOption(option);
        setIsOpen(false);

        // ⭐ BẮT BUỘC: Trả value ra ngoài để Header nhận được
        onChange?.(option.value);
    };

    // Click ra ngoài → đóng menu
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!(event.target as HTMLElement)?.closest(".custom-select-container")) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="custom-select-container relative inline-block w-[200px]">
            <div
                onClick={toggleDropdown}
                className={`select-selected flex items-center justify-between px-3 py-2 bg-white 
          border rounded-md cursor-pointer 
          ${isOpen ? "border-blue-500" : "border-gray-300"}`}
            >
        <span className="truncate">
          {selectedOption?.label || "All Categories"}
        </span>

                <svg
                    className={`w-4 h-4 ml-2 transform transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {isOpen && (
                <div
                    className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200
            rounded-md shadow-lg max-h-[250px] overflow-y-auto z-50"
                >
                    {options.map((option, index) => (
                        <div
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            className={`px-3 py-2 cursor-pointer text-gray-700 
                hover:bg-blue-50 hover:text-blue-600
                ${
                                selectedOption?.value === option.value
                                    ? "bg-blue-100 text-blue-600 font-medium"
                                    : ""
                            }`}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
