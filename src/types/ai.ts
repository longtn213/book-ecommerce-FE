// types/ai.ts
export type Citation = {
    chunkId: number;
    excerpt: string;
    chapter?: string | null;
    confidence: number;
};

export type AiDiscussionResult = {
    question: string;
    answer: string;
    citations: Citation[];
};
