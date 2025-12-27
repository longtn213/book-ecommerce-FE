"use client";

import dynamic from "next/dynamic";
import { PdfViewerHandle } from "./PdfViewerCanvas.client";

const PdfViewerCanvas = dynamic(
    () => import("./PdfViewerCanvas.client"),
    { ssr: false }
);

export type { PdfViewerHandle };
export default PdfViewerCanvas;
