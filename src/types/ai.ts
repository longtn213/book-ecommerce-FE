// types/ai.ts
export type Citation = {
    chunkId: number;
    excerpt: string;
    chapter?: string | null;
    confidence: number;
};

export type AiDiscussionHistoryItem = {
    messageId: string;
    actionType: "QUESTION" | "SUMMARY" | "EXPLAIN";
    question: string;
    answer: string;
    citations: Citation[] | null;

    selection: {
        text: string;
        charCount: number;
    } | null;

    createdAt: string;
};
