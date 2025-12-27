import axiosInstance from "@/services/axiosInstance";
import {AiDiscussionResult} from "@/types/ai";

export async function discussWithAi(
    ebookId:  number,
    question: string,
): Promise<AiDiscussionResult> {
    const res = await axiosInstance.post(`/ai/discuss`, {
        ebookId,question
    });
    return res.data?.data || [];
}