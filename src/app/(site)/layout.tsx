"use client";

import {useEffect, useState} from "react";
import "../css/euclid-circular-a-font.css";
import "../css/style.css";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import {ModalProvider} from "../context/QuickViewModalContext";
import {CartModalProvider} from "../context/CartSidebarModalContext";
import {ReduxProvider} from "@/redux/provider";
import QuickViewModal from "@/components/Common/QuickViewModal";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import {PreviewSliderProvider} from "../context/PreviewSliderContext";
import ScrollToTop from "@/components/Common/ScrollToTop";
import PreLoader from "@/components/Common/PreLoader";

import {AuthProvider} from "@/context/AuthContext";
import ChatbotWidget from "@/components/Ai/ChatbotWidget";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <html lang="en" suppressHydrationWarning>
        <body
            suppressHydrationWarning
        >

        {/* ---------------- AUTH PROVIDER LUÔN BAO TOÀN BỘ APP ---------------- */}
        <ReduxProvider>
            <AuthProvider>
                <CartModalProvider>
                    <ModalProvider>
                        <PreviewSliderProvider>

                            {loading && <PreLoader />}

                            <Header />
                            <main>{children}</main>

                            <QuickViewModal />
                            <CartSidebarModal />

                            {/* ⭐⭐ CHỈ RENDER CHATBOT KHI USER ĐĂNG NHẬP ⭐⭐ */}
                            <ChatbotWidget />

                        </PreviewSliderProvider>
                    </ModalProvider>

                    <ScrollToTop />
                    <Footer />
                </CartModalProvider>
            </AuthProvider>
        </ReduxProvider>

        </body>
        </html>
    );
}
