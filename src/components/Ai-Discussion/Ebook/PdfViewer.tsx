"use client";

export default function PdfIframeViewer({ url }: { url: string }) {
    return (
        <div className="w-full h-full overflow-hidden">
            <iframe src={url} className="w-full h-full border-none" />
        </div>
    );
}
