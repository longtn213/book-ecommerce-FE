import {Book} from "@/types/book";

export const EyeIcon = ({isOpen}: { isOpen: boolean }) => (
    isOpen ? (
        <svg xmlns="http://www.w3.org/2000/svg"
             className="w-5 h-5 text-gray-600"
             fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274
4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
        </svg>
    ) : (
        <svg xmlns="http://www.w3.org/2000/svg"
             className="w-5 h-5 text-gray-600"
             fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478
0-8.268-2.943-9.542-7a9.97 9.97 0 012.293-3.95M6.1
6.1A9.967 9.967 0 0112 5c4.478 0 8.268
2.943 9.542 7a9.972 9.972 0 01-4.043
5.225M15 12a3 3 0 11-6 0"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 3l18 18"/>
        </svg>
    )
);

export const convertBookToProduct = (b: any) => ({
    id: b.id,
    title: b.title,
    slug: b.slug || "",
    isbn: b.isbn || "",
    description: b.description || "",
    price: b.price,
    stockQuantity: b.stockQuantity || 0,
    pages: b.pages || 0,
    language: b.language || "",
    publishYear: b.publishYear || 0,
    status: b.status || "",
    publisherName: b.publisherName || "",
    authors: b.authors?.map((a: any) => a.name) || [],
    categories: b.categories?.map((c: any) => c.name) || [],
    images: b.images?.length ? b.images : ["/images/default-book.png"],
    rating: b.rating || 0,
    reviewCount: b.reviewCount || 0,
    inDatabase: b.inDatabase || 0,
});
export const formatReviewDate = (dateString: Date | string): string => {
    const date = new Date(dateString);
    const now = new Date();

    const isToday =
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);

    const isYesterday =
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear();

    const time = date.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
    });

    if (isToday) return `Hôm nay, ${time}`;
    if (isYesterday) return `Hôm qua, ${time}`;

    if (date.getFullYear() === now.getFullYear()) {
        return `${date.getDate().toString().padStart(2, "0")}/${
            (date.getMonth() + 1).toString().padStart(2, "0")
        } lúc ${time}`;
    }

    return `${date.getDate().toString().padStart(2, "0")}/${
        (date.getMonth() + 1).toString().padStart(2, "0")
    }/${date.getFullYear()} lúc ${time}`;
};
// constants/shipping.ts
export const BASE_SHIP_FEE = 40000; // phí ship chuẩn
export const FREESHIP_MIN_AMOUNT = 500000; // đủ 300k thì freeship

export const normalizeToBook = (item: any): Book => ({
    id: item.id ?? 0,
    title: item.title,
    slug: item.slug ?? "",
    isbn: "",
    description: "",
    price: item.price ?? 0,
    stockQuantity: 0,
    pages: 0,
    language: "",
    publishYear: 0,
    status: "",
    publisherName: "",
    authors: item.author ? [item.author] : ["Không rõ"],
    categories: [],
    images: Array.isArray(item.coverUrl)
        ? item.coverUrl
        : item.coverUrl
            ? [item.coverUrl]
            : ["/placeholder-book.png"],
    rating: 0,
    reviewCount: 0,
    inDatabase: item.inDatabase,
});
