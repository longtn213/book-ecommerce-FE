import { Book } from "@/types/book";

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
    id: string;
    role: ChatRole;
    content: string;
    books?: Book[];
    chatIdFromServer?: number | string;
    feedbackRating?: number; // ⭐ số sao 1→5
    feedbackComment?: string;
}


export interface ChatRequest {
    message: string;
}

export interface ChatResponse {
    chatId: string | number;
    answer: string;
    books?: Book[];
}
