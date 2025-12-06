"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import { ChatMessage } from "@/types/chatbot";
import {chatWithAI, getAiRecommend, sendChatFeedback} from "@/services/chatbotService";
import ChatMessageItem from "./ChatMessageItem";
import { Loader2, SendHorizonal } from "lucide-react";
import { normalizeToBook } from "@/utils/helper";
import ChatbotRecommendList from "@/components/Ai/ChatbotRecommendList";

interface ChatbotProps {
    variant?: "widget" | "full";
    onClose?: () => void;
}

const Chatbot = ({ variant = "full", onClose }: ChatbotProps) => {
    const initialMessage: ChatMessage = {
        id: "welcome",
        role: "assistant",
        content:
            "Xin chào 👋\nTôi là trợ lý AI gợi ý sách. Bạn muốn đọc thể loại gì hoặc tâm trạng hiện tại ra sao?",
    };

    const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorText, setErrorText] = useState("");

    const scrollRef = useRef<HTMLDivElement | null>(null);

    const [showRatingModal, setShowRatingModal] = useState(false);
    const [ratingTarget, setRatingTarget] = useState<ChatMessage | null>(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    // 🔄 Scroll bottom every message
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, loading]);

    // 🧹 Reset when closing chatbot
    const resetMessages = () => {
        setMessages([initialMessage]);
        setInput("");
        setErrorText("");
        setShowRatingModal(false);
        setRating(0);
        setComment("");
    };

    // ✉ Handle submit
    const handleSubmit = async (e: FormEvent | any) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const text = input.trim();

        const userMsg: ChatMessage = {
            id: `user-${Date.now()}`,
            role: "user",
            content: text,
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput("");

        try {
            setLoading(true);
            const res = await chatWithAI({ message: text });

            const normalizedBooks = (res.suggestions ?? []).map(normalizeToBook);

            const aiMessage: ChatMessage = {
                id: `assistant-${res.chatId}-${Date.now()}`,
                role: "assistant",
                content: res.answer,
                books: normalizedBooks,
                chatIdFromServer: res.chatId,
            };

            // 👉 ADD message
            setMessages((prev) => [...prev, aiMessage]);
        } catch (err) {
            console.error(err);
            setErrorText("Đã có lỗi khi gọi AI. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    // ⭐ Handle open rating modal
    const handleFeedback = (msg: ChatMessage, action: "OPEN_MODAL") => {
        if (action === "OPEN_MODAL") {
            setRatingTarget(msg);
            setShowRatingModal(true);
        }
    };
    const [systemRecommendMsg, setSystemRecommendMsg] = useState<ChatMessage | null>(null);

    useEffect(() => {
        fetchRecommendBooks();
    }, []);

    const fetchRecommendBooks = async () => {
        try {
            const books = await getAiRecommend();  // Trả ra đúng list Book

            setSystemRecommendMsg({
                id: "system-recommend",
                role: "assistant",
                content: "📚 Gợi ý dành riêng cho bạn",
                books, // GIỮ NGUYÊN KHÔNG CHUYỂN ĐỔI
            });
        } catch (e) {
            console.error("Recommend fetch error:", e);
        }
    };


    // 🎨 STYLE
    const containerClass =
        variant === "widget"
            ? "h-full flex flex-col"
            : "flex w-full justify-center py-10 px-4 bg-gray-50";

    const wrapperClass =
        variant === "widget"
            ? "flex flex-col h-full bg-white"
            : "w-full max-w-[800px] rounded-2xl border bg-white shadow-lg flex flex-col";

    const chatBoxHeight = variant === "widget" ? "h-[380px]" : "h-[70vh]";

    const inputWrapperClass =
        variant === "widget"
            ? "border-t bg-white px-3 py-3"
            : "border-t bg-white px-4 py-3 rounded-b-2xl";

    return (
        <div className={containerClass}>
            <div className={wrapperClass}>
                {/* HEADER */}
                {variant === "full" && (
                    <div className="flex items-center justify-between border-b px-4 py-3 bg-white rounded-t-2xl">
                        <div>
                            <h2 className="text-base font-semibold text-gray-7">
                                Trợ lý gợi ý sách AI
                            </h2>
                            <p className="text-xs text-gray-5">
                                Hỏi AI – Nhận gợi ý sách phù hợp
                            </p>
                        </div>

                        {/* Nút đóng popup */}
                        {onClose && (
                            <button
                                onClick={() => {
                                    resetMessages();
                                    onClose();
                                }}
                                className="text-xl text-gray-5 hover:text-gray-7"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                )}

                {/* CHAT */}
                <div
                    ref={scrollRef}
                    className={`flex-1 overflow-y-auto px-4 py-4 bg-gray-50 space-y-3 ${chatBoxHeight}`}
                >
                    {systemRecommendMsg && (
                        <div className="px-4">
                            <ChatbotRecommendList
                                books={systemRecommendMsg.books}
                                onClose={onClose}   // truyền prop xuống
                            />
                        </div>
                    )}

                    {messages.map((m) => (
                        <ChatMessageItem
                            key={m.id}
                            message={m}
                            onFeedback={handleFeedback}
                        />
                    ))}

                    {loading && (
                        <div className="flex items-center gap-2 bg-white w-fit px-3 py-2 rounded-2xl text-xs shadow">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            AI đang suy nghĩ...
                        </div>
                    )}

                    {errorText && (
                        <p className="text-center text-xs text-red-500">{errorText}</p>
                    )}
                </div>

                {/* INPUT */}
                <form onSubmit={handleSubmit} className={inputWrapperClass}>
                    <div className="flex items-end gap-2">
            <textarea
                className="flex-1 min-h-[40px] max-h-32 resize-none rounded-xl border border-gray-300 bg-gray-100 px-3 py-2 text-sm outline-none
              focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary
              disabled:bg-gray-200 disabled:cursor-not-allowed"
                placeholder={
                    loading
                        ? "AI đang trả lời, vui lòng đợi..."
                        : "Bạn muốn tìm gợi ý sách gì?"
                }
                value={input}
                disabled={loading}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (loading) return;

                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        if (input.trim()) handleSubmit(e);
                    }
                }}
            />

                        <button
                            type="submit"
                            disabled={loading || !input.trim()}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <SendHorizonal className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* ⭐ MODAL RATING */}
            {showRatingModal && ratingTarget && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[999999]">
                    <div className="bg-white w-[320px] rounded-xl p-4 shadow-xl animate-fadeIn">
                        <h3 className="text-base font-semibold text-gray-800 mb-2">
                            Đánh giá câu trả lời của AI
                        </h3>

                        <div className="flex gap-2 mb-3">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <button key={i} onClick={() => setRating(i + 1)}>
                  <span
                      className={`text-2xl ${
                          i < rating ? "text-yellow-400" : "text-gray-700"
                      }`}
                  >
                    ★
                  </span>
                                </button>
                            ))}
                        </div>

                        <textarea
                            className="w-full border rounded-lg p-2 text-sm"
                            rows={3}
                            placeholder="Nhận xét thêm (không bắt buộc)"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />

                        <div className="flex justify-end gap-2 mt-3">
                            <button
                                className="px-3 py-1 text-sm bg-gray-200 rounded"
                                onClick={() => setShowRatingModal(false)}
                            >
                                Hủy
                            </button>

                            <button
                                className="px-3 py-1 text-sm bg-primary text-white rounded"
                                onClick={async () => {
                                    await sendChatFeedback(
                                        ratingTarget.chatIdFromServer!,
                                        rating,
                                        comment
                                    );

                                    // UPDATE UI — chỉ update đúng message
                                    setMessages((prev) =>
                                        prev.map((m) =>
                                            m.id === ratingTarget.id
                                                ? {
                                                    ...m,
                                                    feedbackRating: rating,
                                                    feedbackComment: comment,
                                                }
                                                : m
                                        )
                                    );

                                    setShowRatingModal(false);
                                    setRating(0);
                                    setComment("");
                                }}
                            >
                                Gửi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
