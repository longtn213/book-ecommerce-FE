"use client";

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Common/Breadcrumb";
import {forgotPasswordApi, loginApi} from "@/services/authService";
import {notification} from "antd";
import {useAuth} from "@/hook/useAuth";

const Signin = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const {login} = useAuth();
    const [loginUsernameError, setLoginUsernameError] = useState("");
    const [loginPasswordError, setLoginPasswordError] = useState("");

    // ✅ Ant Design notification hook
    const [api, contextHolder] = notification.useNotification();
    const [openForgot, setOpenForgot] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");
    const [sending, setSending] = useState(false);
    const [forgotEmailError, setForgotEmailError] = useState("");
    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };
    const resetForgotState = () => {
        setForgotEmail("");
        setForgotEmailError("");
        setSending(false);
    };
    const handleForgot = async () => {
        setForgotEmailError("");

        if (!forgotEmail) {
            setForgotEmailError("Vui lòng nhập email");
            return;
        }

        if (!validateEmail(forgotEmail)) {
            setForgotEmailError("Email không hợp lệ");
            return;
        }

        setSending(true);

        try {
            const domain = typeof window !== "undefined" ? window.location.origin : "";
            const email = forgotEmail.trim();
            const res = await forgotPasswordApi({email, domain});

            if (res.success) {
                api.success({
                    message: "Đã gửi email khôi phục",
                    description: `Vui lòng kiểm tra ${forgotEmail}`,
                    placement: "topRight",
                });
                resetForgotState();
                setOpenForgot(false);
                setForgotEmail("");
            } else {
                api.error({
                    message: "Gửi thất bại",
                    description: res.message || "Không thể gửi email",
                    placement: "topRight",
                });
            }
        } catch (error) {
            api.error({
                message: "Lỗi máy chủ",
                description: "Không thể gửi email khôi phục",
                placement: "topRight",
            });
        } finally {
            setSending(false);
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset lỗi cũ
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
                    message: "Đăng nhập thành công 🎉",
                    description: `Chào mừng ${res.data.username}!`,
                    placement: "topRight",
                    style: {
                        background: "#f6f8ff",
                        border: "1px solid #3C50E0",
                        borderRadius: 10,
                        boxShadow: "0 4px 10px rgba(60,80,224,0.15)",
                    },
                });

                setTimeout(() => {
                    router.push("/");
                }, 800);

            } else {
                api.error({
                    message: "Đăng nhập thất bại",
                    description: res.message || "Sai thông tin đăng nhập!",
                    placement: "topRight",
                });
            }
        } catch (err: any) {
            api.error({
                message: "Lỗi đăng nhập",
                description:
                    err.response?.data?.message || "Đã xảy ra lỗi máy chủ",
                placement: "topRight",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* ✅ ContextHolder phải nằm ngay sau open tag */}
            {contextHolder}

            <Breadcrumb title="Đăng nhập" pages={["Đăng nhập"]}/>

            <section className="overflow-hidden py-20 bg-gray-2">
                <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
                    <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
                        <div className="text-center mb-11">
                            <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                                Đăng nhập tài khoản của bạn
                            </h2>
                            <p>Nhập thông tin của bạn bên dưới</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-5">
                                <label htmlFor="username" className="block mb-2.5">
                                    Tên đăng nhập
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Tên đăng nhập"
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                        if (loginUsernameError) setLoginUsernameError("");
                                    }}
                                    className={`rounded-lg w-full py-3 px-5 outline-none duration-200 border
        ${loginUsernameError ? "input-error" : "border-gray-300 bg-gray-100"}`}
                                    style={{
                                        borderRadius: "8px",
                                        borderColor: loginUsernameError ? "#ef4444" : "#d1d5db",
                                        backgroundColor: loginUsernameError ? "#fef2f2" : "#f3f4f6",
                                    }}
                                />

                                {loginUsernameError && (
                                    <p className="text-error">
                                        <span style={{ fontSize: "14px" }}>⚠️</span>
                                        {loginUsernameError}
                                    </p>
                                )}
                            </div>

                            <div className="mb-5">
                                <label htmlFor="password" className="block mb-2.5">
                                    Mật khẩu
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Nhập mật khẩu"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (loginPasswordError) setLoginPasswordError("");
                                    }}
                                    className={`rounded-lg w-full py-3 px-5 outline-none duration-200 border
        ${loginPasswordError ? "input-error" : "border-gray-300 bg-gray-100"}`}
                                    style={{
                                        borderRadius: "8px",
                                        borderColor: loginPasswordError ? "#ef4444" : "#d1d5db",
                                        backgroundColor: loginPasswordError ? "#fef2f2" : "#f3f4f6",
                                    }}
                                />

                                {loginPasswordError && (
                                    <p className="text-error">
                                        <span style={{ fontSize: "14px" }}>⚠️</span>
                                        {loginPasswordError}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-7.5"
                            >
                                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                            </button>

                            <a
                                onClick={() => setOpenForgot(true)}
                                className="block text-center text-dark-4 mt-4.5 ease-out duration-200 hover:text-dark cursor-pointer"
                            >
                                Bạn quên mật khẩu?
                            </a>

                            <p className="text-center mt-6">
                                Bạn chưa có tài khoản?
                                <Link
                                    href="/signup"
                                    className="text-dark ease-out duration-200 hover:text-blue pl-2"
                                >
                                    Đăng ký ngay!
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </section>
            {openForgot && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-xl animate-fadeIn">
                        <h2 className="text-xl font-semibold text-dark mb-4 text-center">
                            Quên mật khẩu
                        </h2>

                        <p className="text-center text-dark-5 mb-5">
                            Nhập email của bạn để nhận liên kết đặt lại mật khẩu.
                        </p>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleForgot();
                            }}
                        >
                            <input
                                type="email"
                                placeholder="Nhập email của bạn"
                                value={forgotEmail}
                                onChange={(e) => {
                                    setForgotEmail(e.target.value);
                                    if (forgotEmailError) setForgotEmailError("");
                                }}
                                className={`rounded-lg w-full py-3 px-5 outline-none duration-200 border ${forgotEmailError ? "input-error" : ""}`}
                                style={{
                                    borderRadius: "8px",
                                    borderColor: forgotEmailError ? "#ef4444" : "#d1d5db",
                                    backgroundColor: forgotEmailError ? "#fef2f2" : "#f3f4f6",
                                }}
                            />

                            {forgotEmailError && (
                                <p className="text-error">⚠️ {forgotEmailError}</p>
                            )}

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        resetForgotState();
                                        setOpenForgot(false);
                                    }}
                                    className="flex-1 py-3 rounded-lg border border-gray-3 text-dark hover:bg-gray-2"
                                >
                                    Hủy
                                </button>

                                <button
                                    type="submit"
                                    disabled={sending}
                                    className="flex-1 py-3 rounded-lg bg-dark text-white hover:bg-blue duration-150"
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
