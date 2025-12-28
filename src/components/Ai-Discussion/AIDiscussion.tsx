"use client";

import {useEffect, useRef, useState} from "react";
import PdfViewerCanvas, {PdfViewerHandle,} from "@/components/Ai-Discussion/Ebook/PdfViewerCanvas";
import AiChatPanel from "@/components/Ai-Discussion/AiChatPanel";
import {fetchEBookById} from "@/services/ebookService";
import {notification} from "antd";

interface Ebook {
    ebookId: number;
    fileUrl: string;
    fileSize: number;
}

export const AIDiscussion = ({ bookId }: { bookId: number }) => {
    const [ebook, setEbook] = useState<Ebook | null>(null);
    const pdfRef = useRef<PdfViewerHandle>(null);
    const [selectedText, setSelectedText] = useState<string | null>(null);
    const MAX_CHARS = 15000;
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        fetchEBookById(bookId).then(setEbook);
    }, [bookId]);

    if (!ebook) {
        return <p className="p-10 text-center">Đang tải ebook...</p>;
    }

    return (
        <>
            {contextHolder}
            <div className="w-full h-full bg-neutral-200">
                <div className="flex w-full h-full overflow-hidden">
                    {/* PDF */}
                    <div className="flex-1 min-w-0 h-full">
                        <PdfViewerCanvas
                            ref={pdfRef}
                            fileUrl={ebook.fileUrl}
                            onTextSelected={(text) => {
                                console.log("SELECTED:", text);
                                if (text.length > MAX_CHARS) {
                                    api.error({
                                        title: "Không thể chọn thêm!",
                                        description: `Chỉ được chọn tối đa ${MAX_CHARS} ký tự`,
                                        placement: "topRight",
                                    });
                                    setSelectedText(text.slice(0, MAX_CHARS));
                                } else {
                                    setSelectedText(text);
                                }
                            }}
                        />
                    </div>

                    {/* AI CHAT – GIỮ NGUYÊN LOGIC */}
                    <div className="w-[420px] h-full shrink-0 border-l bg-white">
                        <AiChatPanel
                            ebookId={ebook.ebookId}
                            onOpenChunk={(excerpt) => {
                                pdfRef.current?.scrollToExcerpt(excerpt);
                            }}
                            selectedText={selectedText}
                            onClearSelection={() => {
                                pdfRef.current?.clearHighlights();   // 👈 clear UI
                                setSelectedText(null);                // 👈 clear logic
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
