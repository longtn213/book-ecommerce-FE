"use client";
import Chatbot from "@/components/Ai/Chatbot";

export default function AIChatPage() {
    return (
        <main className="min-h-screen bg-gray-100 py-10">
            <div className="mx-auto max-w-3xl px-4">
                <Chatbot />
            </div>
        </main>
    );
}
