"use client";

import { ChatMessage } from "@/types/chatbot";
import BookCard from "./BookCard";
import BookSuggestionCard from "./BookSuggestionCard";

interface Props {
    message: ChatMessage;
    onFeedback?: (msg: ChatMessage, action: "OPEN_MODAL") => void;
}

const ChatMessageItem = ({ message, onFeedback }: Props) => {
    const isUser = message.role === "user";

    return (
        <div className={`mb-4 flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                    isUser
                        ? "bg-primary text-white rounded-br-none"
                        : "bg-white text-gray-7 border rounded-bl-none"
                }`}
            >
                {/* Nội dung tin nhắn */}
                <p className="whitespace-pre-line break-words">{message.content}</p>

                {/* GỢI Ý SÁCH */}
                {message.books && message.books.length > 0 && (
                    <div className="mt-3 space-y-4">

                        {/* Lọc 2 nhóm */}
                        {(() => {
                            const available = message.books.filter(b => b.inDatabase);
                            const unavailable = message.books.filter(b => !b.inDatabase);

                            return (
                                <>
                                    {/* 1️⃣ Sách chúng tôi hiện có */}
                                    {available.length > 0 && (
                                        <div>
                                            <p className="text-xs font-bold text-gray-700 mb-2">
                                                📚 Sách chúng tôi hiện có
                                            </p>

                                            <div className="grid gap-2 sm:grid-cols-2">
                                                {available.map((b, index) => (
                                                    <BookCard key={`db-${index}`} book={b} />
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* 2️⃣ Những cuốn sách khác bạn có thể quan tâm */}
                                    {unavailable.length > 0 && (
                                        <div>
                                            <p className="text-xs font-bold text-gray-700 mt-3 mb-2">
                                                ✨ Những cuốn sách khác theo mong muốn của bạn
                                            </p>

                                            <div className="grid gap-2 sm:grid-cols-2">
                                                {unavailable.map((b, index) => (
                                                    <BookSuggestionCard
                                                        key={`s-${index}`}
                                                        title={b.title}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            );
                        })()}
                    </div>
                )}

                {/* FEEDBACK */}
                {!isUser && message.chatIdFromServer && onFeedback && (
                    <div className="mt-2 flex items-center gap-2 text-xs text-gray-4">
                        <button
                            onClick={() => onFeedback(message, "OPEN_MODAL")}
                            className="flex items-center gap-1 text-dark border px-2 py-1 rounded-full hover:bg-gray-50"
                        >
                            ⭐ Đánh giá
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatMessageItem;
