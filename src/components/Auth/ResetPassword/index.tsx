"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { notification } from "antd";
import { resetPasswordApi } from "@/services/authService";
import Breadcrumb from "@/components/Common/Breadcrumb";

export default function ResetPassword() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const [errorPassword, setErrorPassword] = useState("");
    const [errorConfirm, setErrorConfirm] = useState("");

    const [loading, setLoading] = useState(false);

    // Antd Notification
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        if (!token) {
            api.error({
                message: "Liên kết không hợp lệ",
                description: "Token đặt lại mật khẩu không tồn tại.",
            });
            router.push("/signin");
        }
    }, [api, router, token]);

    const validate = () => {
        let err = false;
        setErrorPassword("");
        setErrorConfirm("");

        if (!password.trim()) {
            setErrorPassword("Vui lòng nhập mật khẩu mới");
            err = true;
        } else if (password.length < 6) {
            setErrorPassword("Mật khẩu phải từ 6 ký tự trở lên");
            err = true;
        }

        if (confirm !== password) {
            setErrorConfirm("Mật khẩu xác nhận không trùng khớp");
            err = true;
        }

        return !err;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        setLoading(true);

        try {
            const res = await resetPasswordApi({
                token: token!,
                newPassword: password,
            });

            if (res.success) {
                api.success({
                    message: "Thay đổi mật khẩu thành công!",
                    description: "Bạn có thể đăng nhập lại bằng mật khẩu mới.",
                });

                setTimeout(() => router.push("/signin"), 1500);
            } else {
                api.error({
                    message: "Lỗi",
                    description: res.message,
                });
            }
        } catch (err: any) {
            api.error({
                message: "Không thể thay đổi mật khẩu",
                description: err?.message || "Đã xảy ra lỗi",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {contextHolder}
            <Breadcrumb title="Reset Mật Khẩu" pages={["Reset Mật Khẩu"]}/>

            <div className="flex justify-center bg-gray-50 py-12 px-4">
            <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8">

                    <h2 className="text-2xl font-semibold text-center mb-4">Đặt lại mật khẩu</h2>
                    <p className="text-center text-gray-500 mb-6">
                        Nhập mật khẩu mới cho tài khoản của bạn.
                    </p>

                    {/* PASSWORD */}
                    <div className="mb-5">
                        <label className="block mb-1">Mật khẩu mới</label>
                        <input
                            type="password"
                            placeholder="Nhập mật khẩu mới"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrorPassword("");
                            }}
                            className="w-full px-4 py-3 border rounded-lg outline-none bg-gray-100"
                            style={{
                                borderColor: errorPassword ? "#ef4444" : "#d1d5db",
                                backgroundColor: errorPassword ? "#fef2f2" : "#f3f4f6",
                            }}
                        />
                        {errorPassword && (
                            <p className="text-error">
                                <span style={{ fontSize: "14px" }}>⚠️</span>
                                {errorPassword}
                            </p>
                        )}
                    </div>

                    {/* CONFIRM */}
                    <div className="mb-5">
                        <label className="block mb-1">Xác nhận mật khẩu</label>
                        <input
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            value={confirm}
                            onChange={(e) => {
                                setConfirm(e.target.value);
                                setErrorConfirm("");
                            }}
                            className="w-full px-4 py-3 border rounded-lg outline-none bg-gray-100"
                            style={{
                                borderColor: errorConfirm ? "#ef4444" : "#d1d5db",
                                backgroundColor: errorConfirm ? "#fef2f2" : "#f3f4f6",
                            }}
                        />
                        {errorConfirm && (
                            <p className="text-error">
                                <span style={{ fontSize: "14px" }}>⚠️</span>
                                {errorConfirm}
                            </p>
                        )}
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-blue text-white py-3 rounded-lg hover:bg-blue-600 transition"
                    >
                        {loading ? "Đang xử lý..." : "Cập nhật mật khẩu"}
                    </button>
                </div>
            </div>
        </>
    );
}
