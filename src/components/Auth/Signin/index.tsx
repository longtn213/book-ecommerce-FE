"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { forgotPasswordApi, loginApi } from "@/services/authService";
import { notification } from "antd";
import { useAuth } from "@/hook/useAuth";
import { EyeIcon } from "@/utils/helper";

const Signin = () => {
    const router = useRouter();
    const { login } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [loginUsernameError, setLoginUsernameError] = useState("");
    const [loginPasswordError, setLoginPasswordError] = useState("");

    // Forgot password
    const [openForgot, setOpenForgot] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");
    const [forgotEmailError, setForgotEmailError] = useState("");
    const [sending, setSending] = useState(false);

    const [api, contextHolder] = notification.useNotification();

    const validateEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const resetForgotState = () => {
        setForgotEmail("");
        setForgotEmailError("");
        setSending(false);
    };

    const handleForgot = async () => {
        setForgotEmailError("");

        if (!forgotEmail.trim()) {
            return setForgotEmailError("Vui lòng nhập email");
        }
        if (!validateEmail(forgotEmail)) {
            return setForgotEmailError("Email không hợp lệ");
        }

        setSending(true);
        try {
            const domain = typeof window !== "undefined" ? window.location.origin : "";
            const res = await forgotPasswordApi({ email: forgotEmail.trim(), domain });

            if (res.success) {
                api.success({
                    title: "Đã gửi email đặt lại mật khẩu",
                    description: `Vui lòng kiểm tra hộp thư: ${forgotEmail}`,
                    placement: "topRight",
                });

                resetForgotState();
                setOpenForgot(false);
            } else {
                api.error({
                    title: "Gửi thất bại",
                    description: res.message || "Không thể gửi email",
                    placement: "topRight",
                });
            }
        } catch (e) {
            api.error({
                title: "Lỗi máy chủ",
                description: "Không thể gửi email",
                placement: "topRight",
            });
        } finally {
            setSending(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoginUsernameError("");
        setLoginPasswordError("");

        let hasError = false;
        if (!username.trim()) {
            setLoginUsernameError("Vui lòng nhập tên đăng nhập");
            hasError = true;
        }
        if (!password.trim()) {
            setLoginPasswordError("Vui lòng nhập mật khẩu");
            hasError = true;
        }

        if (hasError) return;

        setLoading(true);
        try {
            const res = await loginApi(username, password);

            if (res.success && res.data?.token) {
                await login(res.data.token);

                api.success({
                    title: "Đăng nhập thành công 🎉",
                    description: `Chào mừng ${res.data.username}!`,
                    placement: "topRight",
                });

                setTimeout(() => router.push("/"), 700);
            } else {
                api.error({
                    title: "Đăng nhập thất bại",
                    description: res.message || "Sai thông tin đăng nhập!",
                    placement: "topRight",
                });
            }
        } catch (err: any) {
            api.error({
                title: "Lỗi đăng nhập",
                description: err.response?.data?.message || "Đã xảy ra lỗi máy chủ",
                placement: "topRight",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {contextHolder}
            <Breadcrumb title="Đăng nhập" pages={["Đăng nhập"]} />

            <section className="py-20 bg-gray-100">
                <div className="max-w-[1170px] mx-auto px-4 sm:px-8">
                    <div className="max-w-[500px] mx-auto bg-white rounded-2xl shadow-lg px-6 py-10 sm:px-10">

                        {/* Title */}
                        <div className="text-center mb-10">
                            <h2 className="text-2xl font-bold text-dark mb-1">
                                Đăng nhập tài khoản
                            </h2>
                            <p className="text-gray-500 text-sm">
                                Chào mừng bạn quay trở lại! 👋
                            </p>
                        </div>

                        {/* LOGIN FORM */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Username */}
                            <div>
                                <label className="text-sm font-medium mb-1 block">
                                    Tên đăng nhập
                                </label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                        setLoginUsernameError("");
                                    }}
                                    placeholder="Nhập tên đăng nhập"
                                    className={`w-full px-4 py-3 rounded-lg border bg-gray-50 transition 
                                        focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 
                                        ${loginUsernameError && "border-red-500 bg-red-50"}
                                    `}
                                />
                                {loginUsernameError && (
                                    <p className="mt-1 text-sm text-red-500">{loginUsernameError}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="text-sm font-medium mb-1 block">
                                    Mật khẩu
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setLoginPasswordError("");
                                        }}
                                        placeholder="Nhập mật khẩu"
                                        className={`w-full px-4 py-3 pr-12 rounded-lg border bg-gray-50 transition 
                                            focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 
                                            ${loginPasswordError && "border-red-500 bg-red-50"}
                                        `}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-dark"
                                    >
                                        <EyeIcon isOpen={showPassword} />
                                    </button>
                                </div>

                                {loginPasswordError && (
                                    <p className="mt-1 text-sm text-red-500">{loginPasswordError}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 rounded-lg bg-blue-400 text-white text-base font-semibold
                                           hover:bg-blue-600 transition disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
                            >
                                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                            </button>

                            {/* Forgot password */}
                            <button
                                type="button"
                                onClick={() => setOpenForgot(true)}
                                className="w-full text-center text-sm text-blue-600 hover:underline mt-2"
                            >
                                Quên mật khẩu?
                            </button>

                            {/* Signup link */}
                            <p className="text-center text-sm mt-4">
                                Bạn chưa có tài khoản?
                                <Link href="/signup" className="text-blue-600 font-medium ml-1 hover:underline">
                                    Đăng ký ngay!
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </section>

            {/* FORGOT PASSWORD MODAL */}
            {openForgot && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
                    <div className="bg-white rounded-xl p-7 w-full max-w-md shadow-xl animate-scaleIn">

                        <h2 className="text-xl font-bold text-center text-dark mb-3">
                            Quên mật khẩu
                        </h2>
                        <p className="text-center text-gray-600 mb-6">
                            Nhập email của bạn để nhận liên kết đặt lại mật khẩu.
                        </p>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleForgot();
                            }}
                            className="space-y-5"
                        >
                            <input
                                type="email"
                                value={forgotEmail}
                                onChange={(e) => {
                                    setForgotEmail(e.target.value);
                                    setForgotEmailError("");
                                }}
                                placeholder="Nhập email"
                                className={`w-full px-4 py-3 rounded-lg border bg-gray-50 transition 
                                    focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100
                                    ${forgotEmailError && "border-red-500 bg-red-50"}
                                `}
                            />

                            {forgotEmailError && (
                                <p className="text-red-500 text-sm">{forgotEmailError}</p>
                            )}

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        resetForgotState();
                                        setOpenForgot(false);
                                    }}
                                    className="flex-1 py-3 border rounded-lg hover:bg-gray-100"
                                >
                                    Hủy
                                </button>

                                <button
                                    type="submit"
                                    disabled={sending}
                                    className="flex-1 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blueCustom-dark transition disabled:opacity-60"
                                >
                                    {sending ? "Đang gửi..." : "Gửi email"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Signin;
