"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "@/services/authService";
import { getUserCart } from "@/services/cartService";
import {router} from "next/client";

interface AuthContextType {
    user: any;
    cart: any;
    loading: boolean;
    login: (token: string) => Promise<void>;
    logout: () => void;
    setUser: (u: any) => void;
    setCart: (c: any) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [cart, setCart] = useState<any>({ items: [], totalAmount: 0 });
    const [loading, setLoading] = useState(true);

    // === Load user + cart khi mở ứng dụng ===
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        loadUserAndCart();
    }, []);

    async function loadUserAndCart() {
        try {
            const userData = await getCurrentUser();
            const cartData = await getUserCart();

            setUser(userData);
            setCart(cartData || { items: [], totalAmount: 0 });
        } catch (e) {
            console.error("AuthContext load failed:", e);
            localStorage.removeItem("token");
        } finally {
            setLoading(false);
        }
    }

    // === LOGIN ===
    const login = async (token: string) => {
        localStorage.setItem("token", token);
        await loadUserAndCart();
    };

    // === LOGOUT ===
    const logout = () => {
        localStorage.clear();
        setUser(null);
        setCart({ items: [], totalAmount: 0 });
        setTimeout(() => router.push("/signin"), 800);
    };

    return (
        <AuthContext.Provider
            value={{ user, cart, loading, login, logout, setUser, setCart }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuthContext must be used inside AuthProvider");
    return ctx;
};
