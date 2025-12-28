"use client";

import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";

import * as pdfjsLib from "pdfjs-dist/build/pdf";
import { TextLayerBuilder, EventBus } from "pdfjs-dist/web/pdf_viewer";
import {findPageWrapper} from "@/utils/helper";

export interface PdfViewerHandle {
    scrollToExcerpt: (excerpt: string) => void;
    clearHighlights: () => void;
}

interface Props {
    fileUrl: string;
    onTextSelected?: (text: string) => void;
}

const PdfViewerCanvas = forwardRef<PdfViewerHandle, Props>(
    function PdfViewerCanvas({ fileUrl, onTextSelected }, ref) {
        const containerRef = useRef<HTMLDivElement | null>(null);

        /* ===================== EXPOSE API ===================== */
        useImperativeHandle(ref, () => ({
            scrollToExcerpt(excerpt: string) {
                if (!containerRef.current) return;

                const needle = excerpt
                    .toLowerCase()
                    .replace(/\s+/g, " ")
                    .slice(0, 80);

                const pages = Array.from(
                    containerRef.current.children
                ) as HTMLElement[];

                for (const page of pages) {
                    const pageText = (page.getAttribute("data-text") || "")
                        .toLowerCase()
                        .replace(/\s+/g, " ");

                    if (pageText.includes(needle)) {
                        page.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                        });

                        page
                            .querySelectorAll(".pdf-highlight-overlay")
                            .forEach((el) => el.remove());

                        page.classList.add(
                            "ring-4",
                            "ring-blue-600",
                            "shadow-2xl"
                        );

                        const overlay = document.createElement("div");
                        overlay.className =
                            "pdf-highlight-overlay absolute inset-0 bg-blue-300/30 pointer-events-none rounded";
                        page.appendChild(overlay);

                        setTimeout(() => {
                            page.classList.remove(
                                "ring-4",
                                "ring-blue-600",
                                "shadow-2xl"
                            );
                            overlay.remove();
                        }, 3000);

                        break;
                    }
                }
            },
            clearHighlights() {
                document
                    .querySelectorAll(".pdf-selection-highlight")
                    .forEach((el) => el.remove());
            },
        }));

        /* ===================== RENDER PDF ===================== */
        useEffect(() => {
            const run = async () => {
                pdfjsLib.GlobalWorkerOptions.workerSrc =
                    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

                const pdf = await pdfjsLib.getDocument(fileUrl).promise;

                if (!containerRef.current) return;
                containerRef.current.innerHTML = "";
                const eventBus = new EventBus();

                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const viewport = page.getViewport({ scale: 1.4 });

                    /* ===== PAGE WRAPPER ===== */
                    const wrapper = document.createElement("div");
                    wrapper.className =
                        "relative mb-6 bg-white rounded-lg shadow transition-all duration-300";

                    /* ===== CANVAS ===== */
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d")!;
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;

                    wrapper.appendChild(canvas);
                    containerRef.current.appendChild(wrapper);

                    await page.render({
                        canvasContext: ctx,
                        viewport,
                    }).promise;

                    /* ================= TEXT LAYER (CHO PHÉP BÔI & COPY) ================= */
                    const textContent = await page.getTextContent();

                    const textLayerDiv = document.createElement("div");
                    textLayerDiv.className =
                        "textLayer absolute inset-0 select-text";
                    wrapper.appendChild(textLayerDiv);

                    const textLayer = new TextLayerBuilder({
                        textLayerDiv,
                        eventBus,
                        pageIndex: i - 1,
                        viewport,
                    });

                    textLayer.setTextContent(textContent);
                    textLayer.render();

                    /* ================= TEXT FOR AI SEARCH ================= */
                    const text = textContent.items
                        .map((i: any) => i.str)
                        .join(" ");
                    wrapper.setAttribute("data-text", text);
                }
            };

            run();
        }, [fileUrl]);

        /* ===================== TEXT SELECTION ===================== */
        /* ===================== TEXT SELECTION ===================== */
        useEffect(() => {
            const el = containerRef.current;
            if (!el) return;

            const handleMouseUp = () => {
                const sel = window.getSelection();
                if (!sel || sel.rangeCount === 0) return;

                // ✅ Chỉ nhận selection nếu nó nằm trong PDF container
                const anchorNode = sel.anchorNode;
                const focusNode = sel.focusNode;
                if (!anchorNode || !focusNode) return;
                if (!el.contains(anchorNode) || !el.contains(focusNode)) return;

                // ✅ Snapshot text NGAY
                const selectedText = sel.toString().trim();
                if (!selectedText) return;

                console.log("[PDF] selectedText:", selectedText.slice(0, 80));

                // (Tuỳ bạn) clear selection UI
                // sel.removeAllRanges();

                onTextSelected?.(selectedText);
            };

            // dùng capture để chắc chắn ăn event trước khi focus chuyển chỗ khác
            el.addEventListener("mouseup", handleMouseUp, true);

            return () => {
                el.removeEventListener("mouseup", handleMouseUp, true);
            };
        }, [onTextSelected]);

        return (
            <div
                ref={containerRef}
                className="h-full overflow-y-auto p-4 bg-neutral-100"
            />
        );
    }
);

export default PdfViewerCanvas;
