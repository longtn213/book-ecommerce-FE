"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { loginApi } from "@/services/authService";
import { notification } from "antd";
import {useAuth} from "@/hook/useAuth";

const Signin = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    // ✅ Ant Design notification hook
    const [api, contextHolder] = notification.useNotification();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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

            <Breadcrumb title="Signin" pages={["Signin"]} />

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
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                                />
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
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-7.5"
                            >
                                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                            </button>

                            <a
                                href="#"
                                className="block text-center text-dark-4 mt-4.5 ease-out duration-200 hover:text-dark"
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
        </>
    );
};

export default Signin;
