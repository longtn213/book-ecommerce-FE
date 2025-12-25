"use client";

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function AiChatPanel({ open, onClose }: Props) {
    if (!open) return null;

    return (
        <div className="h-full w-full flex flex-col bg-white">
            {/* ================= Header ================= */}
            <div className="h-14 flex items-center justify-between px-4 border-b shrink-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <div className="flex items-center gap-2 font-semibold">
                    <span className="text-lg">🤖</span>
                    <span>Thảo luận AI</span>
                </div>
                <button
                    onClick={onClose}
                    className="text-white/80 hover:text-white text-lg"
                >
                    ✕
                </button>
            </div>

            {/* ================= Content ================= */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Context card */}
                <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 text-sm">
                    <p className="font-medium text-blue-900 mb-2">
                        📘 Bạn đang đọc nội dung này
                    </p>

                    <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full bg-white border text-xs font-medium text-blue-700">
                            Tóm tắt
                        </span>
                        <span className="px-3 py-1 rounded-full bg-white border text-xs font-medium text-blue-700">
                            Giải thích
                        </span>
                        <span className="px-3 py-1 rounded-full bg-white border text-xs font-medium text-blue-700">
                            Phân tích sâu
                        </span>
                    </div>
                </div>

                {/* Empty chat state */}
                <div className="flex flex-col items-center justify-center text-center text-gray-400 py-12">
                    <div className="text-4xl mb-3">💬</div>
                    <p className="text-sm">
                        Hỏi AI để hiểu sâu hơn nội dung bạn đang đọc
                    </p>
                </div>
            </div>

            {/* ================= Input ================= */}
            {/* ================= Input ================= */}
            <div className="border-t p-3 bg-white shrink-0">
    <textarea
        placeholder="Hỏi AI về đoạn bạn đang đọc..."
        rows={2}
        className="
            w-full resize-none rounded-xl border
            px-4 py-2 text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500
        "
    />

                <div className="mt-2 flex items-center justify-between gap-2">
                    <select
                        className="
                rounded-lg border px-3 py-1.5 text-sm
                bg-gray-50 focus:outline-none
            "
                    >
                        <option>Giải thích</option>
                        <option>Tóm tắt</option>
                        <option>Phân tích sâu</option>
                    </select>

                    <button
                        className="
                px-5 py-2 rounded-lg
                bg-blue-600 hover:bg-blue-700
                text-white text-sm font-medium
                shadow-sm
            "
                    >
                        Gửi
                    </button>
                </div>
            </div>
        </div>
    );
}
