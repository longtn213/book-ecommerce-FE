import axiosInstance from "@/services/axiosInstance";
import {AiDiscussionHistoryItem} from "@/types/ai";

export async function discussWithAi(
    ebookId:  number,
    question: string,
): Promise<AiDiscussionHistoryItem> {
    const res = await axiosInstance.post(`/ai/discuss`, {
        ebookId,question
    });
    return res.data?.data || [];
}

export interface AiSelectionRequest {
    ebookId: number;
    action: "SUMMARY" | "EXPLAIN" | "QUESTION";
    question?: string;
    selectedText: string;
}

export async function askAiOnSelection(
    req: AiSelectionRequest
): Promise<AiDiscussionHistoryItem> {
    const res = await axiosInstance.post(`/ai/selection`, req);
    return res.data?.data || [];
}
export async function getHistoryAiDiscussion(ebookId: number): Promise<AiDiscussionHistoryItem[]> {
    const res = await axiosInstance.get(`/ai/${ebookId}/discussions`,);
    return res.data?.data || [];
}