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
        {loading ? (
            <PreLoader />
        ) : (
            <ReduxProvider>
                <CartModalProvider>
                    <ModalProvider>
                        <PreviewSliderProvider>
                            <Header />
                            {children}

                            <QuickViewModal />
                            <CartSidebarModal />
                            <PreviewSliderModal />
                        </PreviewSliderProvider>
                    </ModalProvider>
                </CartModalProvider>
                <ScrollToTop />
                <Footer />
            </ReduxProvider>
        )}
        </body>
        </html>
    );
}
