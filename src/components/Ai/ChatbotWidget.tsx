"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import Chatbot from "./Chatbot";
import {useAuthContext} from "@/context/AuthContext";
import {useCartModalContext} from "@/app/context/CartSidebarModalContext";

const ChatbotWidget = () => {
    const [open, setOpen] = useState(false);
    const { user, loading } = useAuthContext();
    const { isCartModalOpen } = useCartModalContext();
    // ⛔ KHÔNG render gì khi chưa sẵn sàng
    if (loading) return null;

    // ⭐ User chưa login → Không render chatbot
    if (!user) return null;

    // ➤ Khi giỏ hàng mở → tắt chatbot
    if (isCartModalOpen) return null;
    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setOpen(true)}
                className="fixed bottom-6 right-[90px] z-[99999] flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-xl transition-all hover:scale-105 active:scale-95"
            >
                <MessageCircle className="h-7 w-7" />
            </button>

            {/* Overlay */}
            {open && (
                <div
                    className="fixed inset-0 z-[99998] bg-black/30 animate-fadeIn"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Popup Chat Window */}
            <div
                className={`fixed bottom-6 right-6 z-[99999] w-[380px] max-w-[95vw] rounded-2xl border bg-white shadow-2xl transition-all duration-300 ${
                    open
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0 pointer-events-none"
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b px-4 py-3 bg-white rounded-t-2xl">
                    <div>
                        <p className="font-semibold text-gray-900 text-sm">
                            Trợ lý gợi ý sách AI
                        </p>
                        <p className="text-xs text-gray-500">
                            Chat với AI để tìm sách phù hợp
                        </p>
                    </div>

                    <button
                        onClick={() => setOpen(false)}
                        className="p-1 rounded-full hover:bg-gray-100 transition"
                    >
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="h-[480px] overflow-hidden rounded-b-2xl bg-gray-50">
                    <Chatbot
                        variant="widget"
                        onClose={() => setOpen(false)}
                    />

                </div>
            </div>
        </>
    );
};

export default ChatbotWidget;
