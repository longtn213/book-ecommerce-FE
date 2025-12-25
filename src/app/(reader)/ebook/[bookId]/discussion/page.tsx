'use client';

import { useParams } from 'next/navigation';
import {AIDiscussion} from "@/components/Ai-Discussion/AIDiscussion";

export default function EbookDiscussionPage() {
    const params = useParams();
    const bookId = Number(params.bookId);

    if (!bookId) {
        return <p className="p-10 text-center">Book không hợp lệ</p>;
    }

    return (
        <div className="w-full h-full bg-neutral-100 overflow-hidden">
            <div className="mx-auto h-full max-w-[1600px]">
                <AIDiscussion bookId={bookId} />
            </div>
        </div>
    );

}
