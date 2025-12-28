"use client";

import { useState } from "react";
import { AiDiscussionResult } from "@/types/ai";
import {askAiOnSelection, discussWithAi} from "@/services/aiService";

type ChatItem = {
    role: "user" | "ai";
    content: string;
    citations?: AiDiscussionResult["citations"];
};

export default function AiChatPanel({
                                        ebookId,
                                        onOpenChunk,
                                        selectedText,
                                        onClearSelection
                                    }: {
    ebookId: number;
    onOpenChunk: (excerpt: string) => void;
    selectedText?: string | null;
    onClearSelection: () => void;
}) {
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState<ChatItem[]>([]);
    const [loading, setLoading] = useState(false);

    const handleAsk = async () => {
        if (!question.trim() || loading) return;

        const userQuestion = question;

        // 1️⃣ Push user message
        setMessages((prev) => [
            ...prev,
            { role: "user", content: userQuestion },
        ]);

        // 2️⃣ Clear input
        setQuestion("");
        setLoading(true);

        // 3️⃣ Call API
        const res = selectedText
            ? await askAiOnSelection({
                ebookId,
                action: "SUMMARY",
                question: userQuestion,
                selectedText
            })
            : await discussWithAi(ebookId, userQuestion);

        // 4️⃣ Push AI message
        setMessages((prev) => [
            ...prev,
            {
                role: "ai",
                content: res.answer,
                citations: res.citations,
            },
        ]);

        onClearSelection();
        // 5️⃣ Clear selection
        window.getSelection()?.removeAllRanges();

        setLoading(false);
    };

    return (
        <div className="h-full w-full flex flex-col bg-white">
            {/* ================= Header ================= */}
            <div className="h-14 flex items-center px-4 border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                🤖 <span className="ml-2 font-semibold">Thảo luận AI</span>
            </div>

            {/* ================= Content ================= */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                    <div className="text-center text-gray-400 py-12">
                        💬 Hỏi AI để hiểu sâu hơn nội dung bạn đang đọc
                    </div>
                )}

                {messages.map((msg, index) => (
                    <div key={index}>
                        {/* ===== USER MESSAGE ===== */}
                        {msg.role === "user" && (
                            <div className="flex justify-end">
                                <div className="max-w-[80%] rounded-2xl bg-blue-600 text-white px-4 py-2 text-sm">
                                    {msg.content}
                                </div>
                            </div>
                        )}

                        {/* ===== AI MESSAGE ===== */}
                        {msg.role === "ai" && (
                            <div className="space-y-3">
                                <div className="max-w-[85%] rounded-2xl bg-indigo-50 px-4 py-3 text-sm text-gray-800">
                                    <p className="font-semibold mb-1">🤖 AI trả lời</p>
                                    <p className="whitespace-pre-line">{msg.content}</p>
                                </div>

                                {/* ===== CITATIONS ===== */}
                                {Array.isArray(msg.citations) &&
                                    msg.citations.length > 0 && (
                                        <div className="space-y-2 pl-2">
                                            <p className="font-semibold text-sm">
                                                📖 Dẫn chứng từ sách
                                            </p>

                                            {msg.citations.map((c) => (
                                                <div
                                                    key={c.chunkId}
                                                    className="border rounded-lg p-3 bg-white"
                                                >
                                                    <div className="flex justify-between text-xs mb-1">
                            <span className="font-medium">
                              {c.chapter ?? "Nguồn trong sách"}
                            </span>
                                                        <span className="text-gray-500">
                              {(c.confidence * 100).toFixed(0)}%
                            </span>
                                                    </div>

                                                    <p className="italic text-sm line-clamp-3 text-gray-700">
                                                        “{c.excerpt}”
                                                    </p>

                                                    <button
                                                        onClick={() => onOpenChunk(c.excerpt)}
                                                        className="mt-2 text-xs text-blue-600 hover:underline"
                                                    >
                                                        Xem trong sách →
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                            </div>
                        )}
                    </div>
                ))}

                {loading && (
                    <div className="text-sm text-gray-400 italic">
                        🤖 AI đang suy nghĩ...
                    </div>
                )}
            </div>

            {/* ================= Input ================= */}
            <div className="border-t p-3">
        <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Hỏi AI về đoạn bạn đang đọc..."
            rows={2}
            className="w-full rounded-xl border px-4 py-2 text-sm"
            onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleAsk();
                }
            }}
        />

                <div className="mt-2 flex justify-end">
                    <button
                        onClick={handleAsk}
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
                    >
                        {loading ? "Đang hỏi..." : "Gửi"}
                    </button>
                </div>
            </div>
        </div>
    );
}
