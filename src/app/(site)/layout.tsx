"use client";

import { useState, useEffect } from "react";
import "../css/euclid-circular-a-font.css";
import "../css/style.css";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { ModalProvider } from "../context/QuickViewModalContext";
import { CartModalProvider } from "../context/CartSidebarModalContext";
import { ReduxProvider } from "@/redux/provider";
import QuickViewModal from "@/components/Common/QuickViewModal";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import { PreviewSliderProvider } from "../context/PreviewSliderContext";
import PreviewSliderModal from "@/components/Common/PreviewSlider";
import ScrollToTop from "@/components/Common/ScrollToTop";
import PreLoader from "@/components/Common/PreLoader";

import { AuthProvider } from "@/context/AuthContext";

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
            data-new-gr-c-s-check-loaded="14.1261.0"
            data-gr-ext-installed=""
        >

        {/* ---------------- AUTH PROVIDER LUÔN BAO TOÀN BỘ APP ---------------- */}
        <AuthProvider>
            <ReduxProvider>
                <CartModalProvider>
                    <ModalProvider>
                        <PreviewSliderProvider>

                            {/* Preloader chỉ là overlay UI */}
                            {loading && <PreLoader />}

                            {/* Header luôn phải nằm trong AuthProvider để nhận user */}
                            <Header />

                            {/* Nội dung chính */}
                            <main>{children}</main>

                            {/* Các modal của bạn */}
                            <QuickViewModal />
                            <CartSidebarModal />
                            <PreviewSliderModal />

                        </PreviewSliderProvider>
                    </ModalProvider>

                    <ScrollToTop />
                    <Footer />

                </CartModalProvider>
            </ReduxProvider>
        </AuthProvider>

        </body>
        </html>
    );
}
