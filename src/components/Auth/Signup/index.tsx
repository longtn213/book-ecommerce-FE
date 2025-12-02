"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { notification } from "antd";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { register } from "@/services/authService";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { useAuth } from "@/hook/useAuth";

const Signup = () => {
    const router = useRouter();
    const { login } = useAuth();
    const [api, contextHolder] = notification.useNotification();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        fullName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const validateField = (name: string, value: string) => {
        let msg = "";

        if (!value.trim()) {
            msg = "Trường này là bắt buộc.";
        } else {
            if (name === "email") {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!regex.test(value)) msg = "Email không hợp lệ.";
            }
            if (name === "password") {
                if (value.length < 6) msg = "Mật khẩu phải ít nhất 6 ký tự.";
            }
            if (name === "confirmPassword") {
                if (value !== formData.password) msg = "Mật khẩu không trùng khớp.";
            }
        }

        setErrors((prev) => ({ ...prev, [name]: msg }));
    };

    useEffect(() => {
        const noErrors =
            Object.values(errors).every((e) => e === "") &&
            Object.values(formData).every((v) => v.trim() !== "") &&
            formData.password === formData.confirmPassword;

        setIsFormValid(noErrors);
    }, [errors, formData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isFormValid) return;

        setLoading(true);

        try {
            const res = await register({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                fullName: formData.fullName,
            });

            if (res.success && res.data?.token) {
                await login(res.data.token);

                api.success({
                    message: "Đăng ký thành công 🎉",
                    description: "Bạn đã được đăng nhập tự động!",
                    placement: "topRight",
                });

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
                description: err.response?.data?.message || "Đã xảy ra lỗi!",
                placement: "topRight",
            });
        } finally {
            setLoading(false);
        }
    };

    const inputErrorClass =
        "border-red-500 bg-red-50 focus:ring-red-200 focus:border-red-500";

    return (
        <>
            {contextHolder}

            <Breadcrumb title={"Đăng ký"} pages={["Đăng ký"]} />

            <section className="py-20 bg-gray-100">
                <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
                    <div className="max-w-[500px] mx-auto bg-white rounded-2xl shadow-lg px-6 py-10 sm:px-10">

                        <div className="text-center mb-10">
                            <h2 className="text-2xl font-bold text-dark mb-1">Tạo tài khoản mới</h2>
                            <p className="text-gray-600 text-sm">Điền thông tin bên dưới để đăng ký</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* FULL NAME */}
                            <div>
                                <label className="text-sm font-medium mb-1 block">
                                    Họ và tên <span className="text-red-600">*</span>
                                </label>

                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Nhập họ và tên"
                                    className={`w-full px-4 py-3 rounded-lg border bg-gray-50
                    focus:bg-white focus:ring-2 transition 
                    ${errors.fullName ? inputErrorClass : "focus:border-blue-500"}`}
                                />

                                {errors.fullName && (
                                    <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
                                )}
                            </div>

                            {/* EMAIL */}
                            <div>
                                <label className="text-sm font-medium mb-1 block">
                                    Email <span className="text-red-600">*</span>
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Nhập email"
                                    className={`w-full px-4 py-3 rounded-lg border bg-gray-50
                    focus:bg-white focus:ring-2 transition 
                    ${errors.email ? inputErrorClass : "focus:border-blue-500"}`}
                                />

                                {errors.email && (
                                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>

                            {/* USERNAME */}
                            <div>
                                <label className="text-sm font-medium mb-1 block">
                                    Tên đăng nhập <span className="text-red-600">*</span>
                                </label>

                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Nhập tên đăng nhập"
                                    className={`w-full px-4 py-3 rounded-lg border bg-gray-50
                    focus:bg-white focus:ring-2 transition 
                    ${errors.username ? inputErrorClass : "focus:border-blue-500"}`}
                                />

                                {errors.username && (
                                    <p className="text-red-600 text-sm mt-1">{errors.username}</p>
                                )}
                            </div>

                            {/* PASSWORD */}
                            <div>
                                <label className="text-sm font-medium mb-1 block">
                                    Mật khẩu <span className="text-red-600">*</span>
                                </label>

                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Nhập mật khẩu"
                                        className={`w-full px-4 py-3 pr-12 rounded-lg border bg-gray-50
                      focus:bg-white focus:ring-2 transition 
                      ${errors.password ? inputErrorClass : "focus:border-blue-500"}`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-dark"
                                    >
                                        {showPassword ? <HiOutlineEyeOff size={22} /> : <HiOutlineEye size={22} />}
                                    </button>
                                </div>

                                {errors.password && (
                                    <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                                )}
                            </div>

                            {/* CONFIRM PASSWORD */}
                            <div>
                                <label className="text-sm font-medium mb-1 block">
                                    Nhập lại mật khẩu <span className="text-red-600">*</span>
                                </label>

                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Nhập lại mật khẩu"
                                        className={`w-full px-4 py-3 pr-12 rounded-lg border bg-gray-50
                      focus:bg-white focus:ring-2 transition 
                      ${errors.confirmPassword ? inputErrorClass : "focus:border-blue-500"}`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-dark"
                                    >
                                        {showConfirmPassword ? (
                                            <HiOutlineEyeOff size={22} />
                                        ) : (
                                            <HiOutlineEye size={22} />
                                        )}
                                    </button>
                                </div>

                                {errors.confirmPassword && (
                                    <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>
                                )}
                            </div>

                            {/* SUBMIT BUTTON */}
                            <button
                                type="submit"
                                disabled={!isFormValid || loading}
                                className={`w-full py-3 rounded-lg text-white font-semibold transition shadow-md
                  ${
                                    isFormValid
                                        ? "bg-blue-500 hover:bg-blue-600"
                                        : "bg-gray-300 cursor-not-allowed"
                                }`}
                            >
                                {loading ? "Đang xử lý..." : "Tạo tài khoản"}
                            </button>

                            <p className="text-center text-sm mt-4">
                                Đã có tài khoản?
                                <Link
                                    href="/signin"
                                    className="text-blue-600 font-medium ml-1 hover:underline"
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
