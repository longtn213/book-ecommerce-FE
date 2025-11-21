import {Key, useEffect, useRef, useState} from "react";

const CustomSelect = ({options, onChange}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const selectRef = useRef(null);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const handleClickOutside = (event: { target: any; }) => {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option: { value: any; }) => {
        setSelectedOption(option);
        setIsOpen(false);

        // 🔥 TRUYỀN VALUE RA NGOÀI
        onChange?.(option.value);
    };

    return (
        <div className="custom-select custom-select-2 flex-shrink-0 relative" ref={selectRef}>
            <div
                className={`select-selected whitespace-nowrap ${isOpen ? "select-arrow-active" : ""}`}
                onClick={toggleDropdown}
            >
                {selectedOption.label}
            </div>

            <div className={`select-items ${isOpen ? "" : "select-hide"}`}>
                {options.map((option: { value: any; label?: any; }, index: Key) => (
                    <div
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        className={`select-item ${selectedOption.value === option.value ? "same-as-selected" : ""}`}
                    >
                        {option.label}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomSelect;
