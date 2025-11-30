"use client";

interface Props {
    title: string;
}

const BookSuggestionCard = ({ title }: Props) => {
    return (
        <div className="flex flex-col gap-2 rounded-lg border border-gray-3 bg-white p-3 shadow-sm hover:shadow-md transition">

            <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-7 line-clamp-2">
                    {title}
                </h4>

                <p className="text-xs text-gray-5 mt-1">
                    Sách này chưa có trong danh mục của chúng tôi.
                </p>
            </div>

            <button
                className="text-xs w-full text-center border border-primary text-primary px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition"
                onClick={() =>
                    window.location.href = `/contact?title=${encodeURIComponent(title)}`
                }
            >
                Đặt hàng theo yêu cầu
            </button>
        </div>
    );
};

export default BookSuggestionCard;
