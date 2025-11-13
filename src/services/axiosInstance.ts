// src/app/services/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:6868/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// ✅ Optional Bearer Token
axiosInstance.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token =
                localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ✅ Global Error Handling
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (typeof window !== "undefined") {
            if (error.response) {
                const { status } = error.response;

                // ⚠️ Nếu token hết hạn hoặc không hợp lệ
                if (status === 401) {
                    console.warn("Unauthorized — clearing localStorage & redirecting home");
                    localStorage.clear(); // 🔥 Xóa tất cả dữ liệu
                    window.location.href = "/"; // 🔄 Redirect về home
                }

                // 🔥 Lỗi server
                else if (status >= 500) {
                    console.error("Server error:", error.message);
                }
            } else {
                console.error("Network error:", error.message);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
