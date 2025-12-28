"use client";

import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import { EventBus, TextLayerBuilder } from "pdfjs-dist/web/pdf_viewer";

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
                    const pageText = (page.dataset.text || "")
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

                        const overlay = document.createElement("div");
                        overlay.className =
                            "pdf-highlight-overlay absolute inset-0 bg-blue-300/30 pointer-events-none rounded";

                        page.classList.add("ring-4", "ring-blue-600");
                        page.appendChild(overlay);

                        setTimeout(() => {
                            overlay.remove();
                            page.classList.remove(
                                "ring-4",
                                "ring-blue-600"
                            );
                        }, 2500);

                        break;
                    }
                }
            },

            clearHighlights() {
                document
                    .querySelectorAll(".pdf-highlight-overlay")
                    .forEach((el) => el.remove());
            },
        }));

        /* ===================== RENDER PDF ===================== */
        useEffect(() => {
            let cancelled = false;

            const render = async () => {
                pdfjsLib.GlobalWorkerOptions.workerSrc =
                    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

                const pdf = await pdfjsLib.getDocument(fileUrl).promise;
                if (!containerRef.current || cancelled) return;

                containerRef.current.innerHTML = "";

                for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                    const page = await pdf.getPage(pageNum);
                    const viewport = page.getViewport({ scale: 1.4 });

                    /* ===== PAGE WRAPPER ===== */
                    const wrapper = document.createElement("div");
                    wrapper.className =
                        "relative mb-6 bg-white rounded-lg shadow";
                    wrapper.style.width = `${viewport.width}px`;
                    wrapper.style.height = `${viewport.height}px`;

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

                    /* ===== TEXT LAYER ===== */
                    const textContent = await page.getTextContent();

                    const textLayerDiv = document.createElement("div");
                    textLayerDiv.className = "textLayer";
                    textLayerDiv.style.position = "absolute";
                    textLayerDiv.style.top = "0";
                    textLayerDiv.style.left = "0";
                    textLayerDiv.style.width = `${viewport.width}px`;
                    textLayerDiv.style.height = `${viewport.height}px`;

                    wrapper.appendChild(textLayerDiv);

                    const eventBus = new EventBus();
                    const textLayer = new TextLayerBuilder({
                        textLayerDiv,
                        eventBus,
                        pageIndex: pageNum - 1,
                        viewport,
                    });

                    textLayer.setTextContent(textContent);
                    textLayer.render();

                    /* ===== TEXT FOR AI SEARCH ===== */
                    const text = textContent.items
                        .map((i: any) => i.str)
                        .join(" ");
                    wrapper.dataset.text = text;
                }
            };

            render();

            return () => {
                cancelled = true;
            };
        }, [fileUrl]);

        /* ===================== TEXT SELECTION ===================== */
        useEffect(() => {
            const el = containerRef.current;
            if (!el) return;

            const handleMouseUp = () => {
                const sel = window.getSelection();
                if (!sel || sel.rangeCount === 0) return;

                const anchor = sel.anchorNode;
                const focus = sel.focusNode;
                if (!anchor || !focus) return;
                if (!el.contains(anchor) || !el.contains(focus)) return;

                const text = sel.toString().trim();
                if (!text) return;

                onTextSelected?.(text);
            };

            el.addEventListener("mouseup", handleMouseUp, true);
            return () => el.removeEventListener("mouseup", handleMouseUp, true);
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
