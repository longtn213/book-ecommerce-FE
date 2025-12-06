// services/chatbotService.ts
import {ChatRequest} from "@/types/chatbot";
import axiosInstance from "@/services/axiosInstance";

export const chatWithAI = async (payload: ChatRequest) => {
    const res = await axiosInstance.post(`/ai/chat`, payload, {
        timeout: 0,
    });

    const data = res.data.data;

    return {
        chatId: data.chatId,
        answer: data.answer,
        suggestions: data.suggestions,
    };
};

export async function sendChatFeedback(
    chatLogId: string | number,
    rating: number,
    comment: string
): Promise<void> {
    await axiosInstance.post(`/ai/feedback`, {
        chatLogId,
        rating,
        comment,
    });
}

export const getAiRecommend = async () => {
    const res = await axiosInstance.get(`/ai/recommend`);
    return res.data.data;
};