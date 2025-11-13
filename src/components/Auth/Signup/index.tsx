"use client";

import React, {useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {notification} from "antd";
import Breadcrumb from "@/components/Common/Breadcrumb";
import {register} from "@/services/authService";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import {useAuth} from "@/hook/useAuth";

const Signup = () => {
    const router = useRouter();
    const [api, contextHolder] = notification.useNotification();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            api.error({
                message: "Lỗi xác nhận mật khẩu",
                description: "Mật khẩu nhập lại không khớp!",
                placement: "topRight",
            });
            return;
        }

        setLoading(true);

        try {
            const res = await register({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                fullName: formData.fullName,
            });

            if (res.success && res.data?.token) {

                // 🚀 GỌI LOGIN CỦA AUTHCONTEXT
                await login(res.data.token);

                api.success({
                    message: "Đăng ký thành công 🎉",
                    description: "Bạn đã được đăng nhập tự động!",
                    placement: "topRight",
                });

                // 🚀 Chuyển sang trang chủ
                setTimeout(() => router.push("/"), 800);

            } else {
                api.error({
                    message: "Đăng ký thất bại",
                    description: res.message || "Vui lòng thử lại.",
                    placement: "topRight",
                });
            }
        } catch (err: any) {
            api.error({
                message: "Lỗi máy chủ",
                description: err.response?.data?.message || "Có lỗi xảy ra!",
                placement: "topRight",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {contextHolder}
            <Breadcrumb title={"Đăng ký"} pages={["Đăng ký"]} />

            <section className="overflow-hidden py-20 bg-gray-2">
                <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
                    <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
                        <div className="text-center mb-11">
                            <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                                Tạo tài khoản mới
                            </h2>
                            <p>Nhập thông tin của bạn bên dưới</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-5">
                                <label htmlFor="fullName" className="block mb-2.5">
                                    Họ và tên <span className="text-red">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    placeholder="Nhập họ và tên"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                                />
                            </div>

                            <div className="mb-5">
                                <label htmlFor="email" className="block mb-2.5">
                                    Email <span className="text-red">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Nhập email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                                />
                            </div>

                            <div className="mb-5">
                                <label htmlFor="username" className="block mb-2.5">
                                    Tên đăng nhập <span className="text-red">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Nhập tên đăng nhập"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                                />
                            </div>

                            <div className="mb-5">
                                <label htmlFor="password" className="block mb-2.5">
                                    Mật khẩu <span className="text-red">*</span>
                                </label>

                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        placeholder="Nhập mật khẩu"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 pr-12 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-5 hover:text-dark"
                                    >
                                        {showPassword ? (
                                            <HiOutlineEyeOff size={22} />
                                        ) : (
                                            <HiOutlineEye size={22} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="mb-5.5">
                                <label htmlFor="confirmPassword" className="block mb-2.5">
                                    Nhập lại mật khẩu <span className="text-red">*</span>
                                </label>

                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        placeholder="Nhập lại mật khẩu"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 pr-12 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-5 hover:text-dark"
                                    >
                                        {showConfirmPassword ? (
                                            <HiOutlineEyeOff size={22} />
                                        ) : (
                                            <HiOutlineEye size={22} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-7.5"
                            >
                                {loading ? "Đang xử lý..." : "Tạo tài khoản"}
                            </button>

                            <p className="text-center mt-6">
                                Đã có tài khoản?
                                <Link
                                    href="/signin"
                                    className="text-dark ease-out duration-200 hover:text-blue pl-2"
                                >
                                    Đăng nhập ngay
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Signup;
