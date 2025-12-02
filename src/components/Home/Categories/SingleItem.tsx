import Image from "next/image";
import { Category } from "@/types/category";

const SingleItem = ({ item }: { item: Category }) => {
    return (
        <a
            href={`/shop?categoryId=${item.id}`}
            className="
                group flex flex-col items-center text-center
                p-4 rounded-2xl
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]
                bg-white
            "
        >
            {/* ICON — Bo góc & nền nhẹ kiểu Tiki */}
            <div
                className="
                    w-[100px] h-[100px] rounded-2xl
                    bg-gray-50 flex items-center justify-center
                    mb-3 shadow-sm
                    transition-all duration-300
                    group-hover:shadow-md
                    group-hover:bg-gray-100
                "
            >
                <div className="relative w-[100px] h-[100px]">
                    <Image
                        src={item.categoryUrl}
                        alt={item.name}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                </div>
            </div>

            {/* TEXT */}
            <h3
                className="
                    text-[16px] font-semibold text-gray-800
                    tracking-wide
                    bg-gradient-to-r from-blue-500 to-blue-600
                    bg-[length:0%_2px] bg-left-bottom bg-no-repeat
                    transition-all duration-500
                    group-hover:bg-[length:100%_2px]
                    group-hover:text-blue-600
                "
            >
                {item.name}
            </h3>
        </a>
    );
};

export default SingleItem;
