"use client";

import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";

export interface PdfViewerHandle {
    scrollToExcerpt: (excerpt: string) => void;
}

interface Props {
    fileUrl: string;
}

const PdfViewerCanvas = forwardRef<PdfViewerHandle, Props>(
    function PdfViewerCanvas({ fileUrl }, ref) {
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
                        /* ===== 1. Scroll ===== */
                        page.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                        });

                        /* ===== 2. CLEAR OLD HIGHLIGHT ===== */
                        page
                            .querySelectorAll(".pdf-highlight-overlay")
                            .forEach((el) => el.remove());

                        page.classList.remove(
                            "ring-4",
                            "ring-blue-600",
                            "shadow-2xl"
                        );

                        /* ===== 3. ADD STRONG HIGHLIGHT ===== */
                        page.classList.add(
                            "ring-4",
                            "ring-blue-600",
                            "shadow-2xl"
                        );

                        const overlay = document.createElement("div");
                        overlay.className =
                            "pdf-highlight-overlay absolute inset-0 bg-blue-300/30 pointer-events-none rounded";

                        page.appendChild(overlay);

                        /* ===== 4. AUTO REMOVE ===== */
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
        }));

        /* ===================== RENDER PDF ===================== */
        useEffect(() => {
            const run = async () => {
                const pdfjsLib = await import("pdfjs-dist/build/pdf");

                pdfjsLib.GlobalWorkerOptions.workerSrc =
                    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

                const pdf = await pdfjsLib.getDocument(fileUrl).promise;

                if (!containerRef.current) return;
                containerRef.current.innerHTML = "";

                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const viewport = page.getViewport({ scale: 1.4 });

                    /* ===== PAGE WRAPPER ===== */
                    const wrapper = document.createElement("div");
                    wrapper.className =
                        "relative mb-6 bg-white rounded-lg shadow transition-all duration-300";
                    wrapper.setAttribute("data-page", String(i));

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

                    /* ===== TEXT FOR SEARCH ===== */
                    const text = (await page.getTextContent()).items
                        .map((i: any) => i.str)
                        .join(" ");

                    wrapper.setAttribute("data-text", text);
                }
            };

            run();
        }, [fileUrl]);

        return (
            <div
                ref={containerRef}
                className="h-full overflow-y-auto p-4 bg-neutral-100"
            />
        );
    }
);

export default PdfViewerCanvas;
