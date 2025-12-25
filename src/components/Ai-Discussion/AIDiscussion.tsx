"use client";

import PdfIframeViewer from "@/components/Ai-Discussion/Ebook/PdfViewer";
import AiChatPanel from "@/components/Ai-Discussion/AiChatPanel";
import { fetchEBookById } from "@/services/ebookService";
import { useEffect, useState } from "react";

export const AIDiscussion = ({ bookId }: { bookId: number }) => {
    const [ebook, setEbook] = useState<any>(null);

    // ✅ Auto open AI panel
    const [aiOpen, setAiOpen] = useState(true);

    useEffect(() => {
        fetchEBookById(bookId).then(setEbook);
    }, [bookId]);

    if (!ebook) {
        return <p className="p-10 text-center">Đang tải ebook...</p>;
    }

    return (
        <div className="w-full h-full bg-neutral-200">
            <div className="flex w-full h-full overflow-hidden bg-neutral-200">
                <div className="flex-1 min-w-0 h-full bg-neutral-300">
                    <PdfIframeViewer url={ebook.fileUrl} />
                </div>

                <div className="w-[420px] h-full shrink-0 border-l bg-white">
                    <AiChatPanel open={aiOpen} onClose={() => setAiOpen(false)} />
                </div>
            </div>
        </div>
    );

};
