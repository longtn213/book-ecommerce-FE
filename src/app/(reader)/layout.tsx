"use client";
import "../css/euclid-circular-a-font.css";
import "../css/style.css";

import {ReduxProvider} from "@/redux/provider";
import {AuthProvider} from "@/context/AuthContext";
import Header from "@/components/Header";
import {CartModalProvider} from "@/app/context/CartSidebarModalContext";
import {ModalProvider} from "@/app/context/QuickViewModalContext";
import {PreviewSliderProvider} from "@/app/context/PreviewSliderContext";

export default function ReaderLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="vi">
        <body className="h-screen flex flex-col overflow-hidden bg-neutral-100" suppressHydrationWarning>
        <ReduxProvider>
            <AuthProvider>
                <CartModalProvider>
                    <ModalProvider>
                        <PreviewSliderProvider>

                            <Header />

                            {/* ✅ Reader chiếm trọn phần còn lại */}
                            <main
                                className="overflow-hidden"
                                style={{
                                    height: "calc(100vh - var(--header-height))",
                                    marginTop: "var(--header-height)",
                                    minHeight: 0,
                                }}
                            >
                                {children}
                            </main>

                        </PreviewSliderProvider>
                    </ModalProvider>
                </CartModalProvider>
            </AuthProvider>
        </ReduxProvider>
        </body>
        </html>
    );
}

