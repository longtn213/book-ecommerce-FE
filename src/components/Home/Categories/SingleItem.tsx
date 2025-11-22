import Image from "next/image";
import { Category } from "@/types/category";

const SingleItem = ({ item }: { item: Category }) => {
    return (
        <a
            href={`/shop?categoryId=${item.id}`}
            className="group flex flex-col items-center transition-transform hover:-translate-y-1"
        >
        {/* ICON KHÔNG KHUNG */}
            <div className="w-[100px] h-[100px] relative mb-3">
                <Image
                    src={item.categoryUrl}
                    alt={item.name}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            {/* TEXT */}
            <h3
                className="
          text-[16px] font-medium text-dark text-center
          bg-gradient-to-r from-blue to-blue
          bg-[length:0%_2px] bg-left-bottom bg-no-repeat
          transition-all duration-500
          group-hover:bg-[length:100%_2px]
          group-hover:text-blue
        "
            >
                {item.name}
            </h3>
        </a>
    );
};

export default SingleItem;
