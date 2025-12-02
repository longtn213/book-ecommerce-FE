"use client";

import React, {createContext, useCallback, useContext, useEffect, useRef, useState} from "react";
import {getUserCart} from "@/services/cartService";
import {getCurrentUser} from "@/services/userService";
import {usePathname, useRouter} from "next/navigation";
import {fetchWishlistAPI} from "@/services/wishlistService";
import {clearWishlist, setWishlist} from "@/redux/features/wishlist-slice";
import {useDispatch} from "react-redux";

interface AuthContextType {
    user: any;
    cart: any;
    loading: boolean;
    login: (token: string) => Promise<void>;
    logout: () => void;
    setUser: (u: any) => void;
    setCart: (c: any) => void;
    requireLogin: (action?: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [cart, setCart] = useState<any>({ items: [], totalAmount: 0 });
    const [loading, setLoading] = useState(true);

    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [authActionText, setAuthActionText] = useState("thao tác này");

    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();

    // ⭐ Tự đóng modal khi vào trang /signin
    useEffect(() => {
        if (pathname === "/signin") {
            setAuthModalOpen(false);
        }
    }, [pathname]);

// ⭐ Memo hoá để không gây rerender vô hạn
    const loadUserData = useCallback(async () => {
        try {
            const userData = await getCurrentUser();
            const cartData = await getUserCart();
            const wishlistData = await fetchWishlistAPI();

            setUser(userData);
            setCart(cartData || { items: [], totalAmount: 0 });

            dispatch(setWishlist(wishlistData?.data || []));
        } catch (e) {
            console.error("Auth load failed:", e);
            localStorage.removeItem("token");
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

// ⭐ Load lần đầu khi có token
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }
        loadUserData();
    }, [loadUserData]);

    // LOGIN
    const login = async (token: string) => {
        localStorage.setItem("token", token);
        await loadUserData();
    };

    // LOGOUT
    const logout = () => {
        localStorage.clear();
        setUser(null);
        setCart({ items: [], totalAmount: 0 });

        dispatch(clearWishlist());

        setTimeout(() => router.push("/signin"), 300);
    };

    // Require Login Modal
    const requireLogin = (action?: string) => {
        setAuthActionText(action || "thao tác này");
        setAuthModalOpen(true);
    };

    const closeAuthModal = () => setAuthModalOpen(false);
    const modalRef = useRef<HTMLDivElement>(null);

    // ⭐ Handle click outside modal
    useEffect(() => {
        if (!authModalOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                setAuthModalOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [authModalOpen]);
    useEffect(() => {
        if (!authModalOpen) return;

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setAuthModalOpen(false);
            }
        };

        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [authModalOpen]);
    return (
        <AuthContext.Provider
            value={{ user, cart, loading, login, logout, setUser, setCart, requireLogin }}
        >
            {children}

            {/* ⭐ MODAL YÊU CẦU ĐĂNG NHẬP */}
            {authModalOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[99999]">
                    <div ref={modalRef} className="bg-white rounded-xl p-6 w-[360px] shadow-xl">
                        <h2 className="text-lg font-semibold mb-3">Yêu cầu đăng nhập</h2>
                        <p className="text-gray-600 mb-5">
                            Bạn cần đăng nhập để thực hiện {authActionText}.
                        </p>

                        <button
                            onClick={() => {
                                setAuthModalOpen(false);
                                router.push("/signin");
                            }}
                            className="w-full bg-blueCustom text-white py-2 rounded-lg mb-2 hover:bg-blueCustom-dark"
                        >
                            Đi đến trang đăng nhập
                        </button>

                        <button
                            onClick={closeAuthModal}
                            className="w-full bg-gray-200 py-2 rounded-lg hover:bg-gray-300"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            )}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuthContext must be used inside AuthProvider");
    return ctx;
};
