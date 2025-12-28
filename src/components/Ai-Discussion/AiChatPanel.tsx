"use client";

import {useEffect, useRef, useState} from "react";
import {AiDiscussionHistoryItem} from "@/types/ai";
import {askAiOnSelection, discussWithAi, getHistoryAiDiscussion} from "@/services/aiService";

type ChatItem = {
    role: "user" | "ai";
    content: string;
    citations?: AiDiscussionHistoryItem["citations"];
    selectionText?: string;
};
type SelectionAction = "SUMMARY" | "EXPLAIN" | "QUESTION";

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
    const [loadingHistory, setLoadingHistory] = useState(true);
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const [action, setAction] = useState<SelectionAction>("SUMMARY");

    const handleClearSelection = () => {
        onClearSelection();
        setAction("SUMMARY");
    };

    const handleAsk = async () => {
        if (!question.trim() || loading) return;

        const userQuestion = question;

        // 1️⃣ Push user message
        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                content: userQuestion,
                selectionText: selectedText ?? undefined,
            },
        ]);

        // 2️⃣ Clear input
        setQuestion("");
        setLoading(true);

        // 3️⃣ Call API
        const res = selectedText
            ? await askAiOnSelection({
                ebookId,
                action,
                question: userQuestion,
                selectedText,
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

        handleClearSelection()
        // 5️⃣ Clear selection
        window.getSelection()?.removeAllRanges();

        setLoading(false);
    };

    useEffect(() => {
        if (!ebookId) return;

        const loadHistory = async () => {
            setLoadingHistory(true);
            try {
                const history = await getHistoryAiDiscussion(ebookId);

                const mappedMessages: ChatItem[] = history.flatMap((item) => {
                    const result: ChatItem[] = [];

                    // USER MESSAGE
                    if (item.question) {
                        result.push({
                            role: "user",
                            content: item.question,
                            selectionText: item.selection?.text ?? undefined, // 👈 HERE
                        });
                    }

                    // AI MESSAGE
                    if (item.answer) {
                        result.push({
                            role: "ai",
                            content: item.answer,
                            citations: item.citations ?? undefined,
                        });
                    }

                    return result;
                });


                setMessages(mappedMessages);

                // đảm bảo scroll xuống cuối sau khi load history
                requestAnimationFrame(() => {
                    bottomRef.current?.scrollIntoView({ behavior: "auto" });
                });

            } catch (e) {
                console.error("Load AI history failed", e);
            } finally {
                setLoadingHistory(false);
            }
        };

        loadHistory();
    }, [ebookId]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            bottomRef.current?.scrollIntoView({
                behavior: loadingHistory ? "auto" : "smooth",
            });
        }, 0);

        return () => clearTimeout(timeout);
    }, [messages, loadingHistory]);

    return (
        <div className="h-full w-full flex flex-col bg-white">
            {/* ================= Header ================= */}
            <div className="h-14 flex items-center px-4 border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                🤖 <span className="ml-2 font-semibold">Thảo luận AI</span>
            </div>

            {/* ================= Content ================= */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {loadingHistory && (
                    <div className="text-center text-gray-400 italic py-8">
                        ⏳ Đang tải cuộc hội thoại...
                    </div>
                )}

                {!loadingHistory && messages.length === 0 && (
                    <div className="text-center text-gray-400 py-12">
                        💬 Hỏi AI để hiểu sâu hơn nội dung bạn đang đọc
                    </div>
                )}

                {messages.map((msg, index) => (
                    <div key={index}>
                        {/* ===== USER MESSAGE ===== */}
                        {msg.role === "user" && (
                            <div className="flex justify-end">
                                <div className="max-w-[80%] space-y-2">
                                    {/* ===== SELECTION TEXT ===== */}
                                    {msg.selectionText && (
                                        <div className="rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-gray-700">
                                            <p className="font-semibold mb-1">📌 Đoạn đang thảo luận</p>
                                            <p className="italic line-clamp-4">
                                                “{msg.selectionText}”
                                            </p>
                                        </div>
                                    )}

                                    {/* ===== USER QUESTION ===== */}
                                    <div className="rounded-2xl bg-blue-600 text-white px-4 py-2 text-sm">
                                        {msg.content}
                                    </div>
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

                <div ref={bottomRef} />
            </div>

            {/* ================= Input ================= */}
            <div className="border-t p-3">
                {selectedText && (
                    <div className="mb-2 space-y-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-gray-700">
                        <div className="flex justify-between items-start gap-2">
                            <div>
                                <p className="font-semibold mb-1">📌 Đang hỏi về đoạn</p>
                                <p className="italic line-clamp-3">
                                    “{selectedText}”
                                </p>
                            </div>

                            <button
                                onClick={handleClearSelection}
                                className="text-gray-400 hover:text-red-500 text-sm"
                                title="Bỏ chọn đoạn này"
                            >
                                ✕
                            </button>
                        </div>

                        {/* ===== ACTION SELECTOR ===== */}
                        <div className="flex gap-2 pt-1">
                            {[
                                { key: "SUMMARY", label: "Tóm tắt" },
                                { key: "EXPLAIN", label: "Giải thích" },
                                { key: "QUESTION", label: "Hỏi" },
                            ].map((a) => (
                                <button
                                    key={a.key}
                                    onClick={() => setAction(a.key as SelectionAction)}
                                    className={`px-3 py-1 rounded-full text-xs font-medium border
                        ${
                                        action === a.key
                                            ? "bg-blue-600 text-white border-blue-600"
                                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                    }`}
                                >
                                    {a.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
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
