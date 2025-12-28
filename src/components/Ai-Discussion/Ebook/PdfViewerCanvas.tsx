"use client";

import dynamic from "next/dynamic";
import { PdfViewerHandle } from "./PdfViewerCanvas.client";
import "pdfjs-dist/web/pdf_viewer.css";

const PdfViewerCanvas = dynamic(
    () => import("./PdfViewerCanvas.client"),
    { ssr: false }
);

export type { PdfViewerHandle };
export default PdfViewerCanvas;
