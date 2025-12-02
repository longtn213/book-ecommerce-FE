// --- FULL CODE MYACCOUNT UI TIKI STYLE ---
"use client";

import React, { useEffect, useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Image from "next/image";
import Orders from "../Orders";
import {
    changePasswordApi,
    getCurrentUser,
    updateUserProfile,
    uploadAvatarApi,
} from "@/services/userService";

import { notification, DatePicker } from "antd";
import dayjs from "dayjs";
import { useAuthContext } from "@/context/AuthContext";
import { EyeIcon } from "@/utils/helper";
import { useRouter, useSearchParams } from "next/navigation";

const TIKI_BLUE = "#1570EF";

const MyAccount = () => {
    const [activeTab, setActiveTab] = useState("account-details");
    const { user, setUser, logout } = useAuthContext();
    const [api, contextHolder] = notification.useNotification();
    const [showPassword, setShowPassword] = useState({
        old: false,
        new: false,
        confirm: false,
    });
    const router = useRouter();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        gender: "MALE",
        birthDate: null as dayjs.Dayjs | null,
        avatarUrl: "",
    });

    const searchParams = useSearchParams();
    const tabFromURL = searchParams.get("tab");

    const [passwordErrors, setPasswordErrors] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    // ============= LOAD USER =============
    useEffect(() => {
        async function fetchUser() {
            try {
                const u = await getCurrentUser();
                if (u) {
                    setUser(u);
                    setFormData({
                        fullName: u.fullName || "",
                        email: u.email || "",
                        phone: u.phone || "",
                        gender: u.gender || "MALE",
                        birthDate: u.dateOfBirth ? dayjs(u.dateOfBirth) : null,
                        avatarUrl: u.avatarUrl || "",
                    });
                }
            } catch (err) {
                api.error({
                    message: "Không thể tải thông tin tài khoản",
                });
            }
        }
        fetchUser();
    }, []);

    // ======= ACTIVE TAB FROM URL =======
    useEffect(() => {
        if (tabFromURL) {
            setActiveTab(tabFromURL);
        }
    }, [tabFromURL]);

    // ============================= INPUT =============================
    const handleProfileChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // ============================= UPDATE PROFILE =============================
    const onUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await updateUserProfile({
                fullName: formData.fullName.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                gender: formData.gender,
                dateOfBirth: formData.birthDate
                    ? formData.birthDate.format("YYYY-MM-DD") + "T00:00:00"
                    : null,
                avatarUrl: formData.avatarUrl,
            });

            api.success({
                message: "Cập nhật thành công!",
            });

            setUser((prev: any) => ({ ...prev, ...formData }));
        } catch (err: any) {
            api.error({
                message: "Cập nhật thất bại",
                description: err?.response?.data?.message,
            });
        }
    };

    // ============================= PASSWORD =============================
    const validatePasswords = () => {
        const errors: any = {};
        if (!passwords.oldPassword.trim())
            errors.oldPassword = "Vui lòng nhập mật khẩu cũ";

        if (!passwords.newPassword.trim())
            errors.newPassword = "Vui lòng nhập mật khẩu mới";
        else if (passwords.newPassword.length < 6)
            errors.newPassword = "Mật khẩu mới phải ≥ 6 ký tự";

        if (!passwords.confirmPassword.trim())
            errors.confirmPassword = "Vui lòng xác nhận mật khẩu";
        else if (passwords.newPassword !== passwords.confirmPassword)
            errors.confirmPassword = "Xác nhận không khớp";

        setPasswordErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handlePasswordChange = (e: any) => {
        setPasswords({
            ...passwords,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validatePasswords()) return;

        try {
            await changePasswordApi({
                oldPassword: passwords.oldPassword,
                newPassword: passwords.newPassword,
            });

            api.success({
                message: "Đổi mật khẩu thành công",
            });

            logout();
        } catch (err: any) {
            api.error({
                message: "Đổi mật khẩu thất bại",
            });

            setPasswordErrors({
                ...passwordErrors,
                oldPassword: "Mật khẩu cũ không đúng",
            });
        }
    };

    // ================================== UI ==================================
    return (
        <>
            {contextHolder}
            <Breadcrumb title="Tài Khoản Của Tôi" pages={["my account"]} />

            <section className="py-20 bg-gray-100">
                <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
                    <div className="flex flex-col xl:flex-row gap-7.5">

                        {/* ============================= SIDEBAR ============================= */}
                        <div className="xl:max-w-[350px] w-full bg-white rounded-2xl shadow-md overflow-hidden">

                            {/* AVATAR */}
                            <div className="flex flex-col items-center py-10 px-6 relative">

                                <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-white">
                                    <Image
                                        src={formData.avatarUrl || "/images/profile/user-2.jpg"}
                                        alt="avatar"
                                        width={128}
                                        height={128}
                                        className="object-cover w-full h-full"
                                    />
                                </div>

                                {/* CAMERA BTN */}
                                <label
                                    htmlFor="avatarUpload"
                                    className="absolute top-[145px] right-[calc(50%_-_75px)] w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 shadow cursor-pointer hover:bg-gray-300 transition"
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#333"
                                    >
                                        <path d="M12 9a3 3 0 100 6 3 3 0 000-6z" />
                                        <path d="M20 8h-3l-1-2H8L7 8H4v12h16z" />
                                    </svg>
                                </label>

                                <input
                                    type="file"
                                    id="avatarUpload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;

                                        const preview = URL.createObjectURL(file);
                                        setFormData((prev) => ({ ...prev, avatarUrl: preview }));

                                        try {
                                            const res = await uploadAvatarApi(file);
                                            if (res.success && res.data) {
                                                setFormData((prev) => ({ ...prev, avatarUrl: res.data }));
                                                setUser((prev: any) => ({ ...prev, avatarUrl: res.data }));
                                            }
                                        } catch {}
                                    }}
                                />

                                <p className="mt-4 font-semibold text-lg">{user?.fullName}</p>
                                <p className="text-gray-600 text-sm">{user?.email}</p>
                            </div>

                            {/* MENU */}
                            <div className="border-t p-6 space-y-3">

                                <button
                                    onClick={() => {
                                        setActiveTab("account-details");
                                        router.push("/my-account?tab=account-details");
                                    }}
                                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition
                    ${
                                        activeTab === "account-details"
                                            ? "bg-blue-500 text-white"
                                            : "hover:bg-gray-100"
                                    }`}
                                >
                                    Thông tin cá nhân
                                </button>


                                <button
                                    onClick={() => {
                                        setActiveTab("change-password");
                                        router.push("/my-account?tab=change-password");
                                    }}
                                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition
                    ${
                                        activeTab === "change-password"
                                            ? "bg-blue-500 text-white"
                                            : "hover:bg-gray-100"
                                    }`}
                                >
                                    Đổi mật khẩu
                                </button>

                                <button
                                    onClick={() => logout()}
                                    className="w-full text-left px-4 py-3 rounded-lg font-medium hover:bg-gray-100 text-red-500"
                                >
                                    Đăng xuất
                                </button>
                            </div>
                        </div>

                        {/* =================== PANEL: ACCOUNT DETAILS =================== */}
                        {activeTab === "account-details" && (
                            <div className="xl:max-w-[770px] w-full bg-white rounded-2xl shadow-md p-6">
                                <form onSubmit={onUpdateProfile} className="space-y-6">

                                    <div>
                                        <label className="font-medium mb-1 block">Họ và tên</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleProfileChange}
                                            className="input-tiki"
                                        />
                                    </div>

                                    <div>
                                        <label className="font-medium mb-1 block">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleProfileChange}
                                            className="input-tiki"
                                        />
                                    </div>

                                    <div>
                                        <label className="font-medium mb-1 block">Số điện thoại</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleProfileChange}
                                            className="input-tiki"
                                        />
                                    </div>

                                    <div>
                                        <label className="font-medium mb-1 block">Giới tính</label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleProfileChange}
                                            className="input-tiki"
                                        >
                                            <option value="MALE">Nam</option>
                                            <option value="FEMALE">Nữ</option>
                                            <option value="OTHER">Khác</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="font-medium mb-1 block">Ngày sinh</label>
                                        <DatePicker
                                            value={formData.birthDate}
                                            format="YYYY-MM-DD"
                                            onChange={(d) =>
                                                setFormData({ ...formData, birthDate: d })
                                            }
                                            className="input-tiki"
                                        />
                                    </div>

                                    <button className="btn-tiki">Lưu thay đổi</button>
                                </form>
                            </div>
                        )}

                        {/* =================== PANEL: CHANGE PASSWORD =================== */}
                        {activeTab === "change-password" && (
                            <div className="xl:max-w-[770px] w-full bg-white rounded-2xl shadow-md p-6">
                                <h3 className="text-xl font-semibold mb-6">Đổi mật khẩu</h3>

                                <form onSubmit={handleChangePassword} className="space-y-6">

                                    {/* OLD PASS */}
                                    <div>
                                        <label className="font-medium mb-1 block">
                                            Mật khẩu cũ
                                        </label>

                                        <div className="relative">
                                            <input
                                                type={showPassword.old ? "text" : "password"}
                                                name="oldPassword"
                                                value={passwords.oldPassword}
                                                onChange={handlePasswordChange}
                                                className="input-tiki pr-12"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword({
                                                        ...showPassword,
                                                        old: !showPassword.old,
                                                    })
                                                }
                                                className="pass-eye-btn"
                                            >
                                                <EyeIcon isOpen={showPassword.old} />
                                            </button>
                                        </div>

                                        {passwordErrors.oldPassword && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {passwordErrors.oldPassword}
                                            </p>
                                        )}
                                    </div>

                                    {/* NEW PASS */}
                                    <div>
                                        <label className="font-medium mb-1 block">
                                            Mật khẩu mới
                                        </label>

                                        <div className="relative">
                                            <input
                                                type={showPassword.new ? "text" : "password"}
                                                name="newPassword"
                                                value={passwords.newPassword}
                                                onChange={handlePasswordChange}
                                                className="input-tiki pr-12"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword({
                                                        ...showPassword,
                                                        new: !showPassword.new,
                                                    })
                                                }
                                                className="pass-eye-btn"
                                            >
                                                <EyeIcon isOpen={showPassword.new} />
                                            </button>
                                        </div>

                                        {passwordErrors.newPassword && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {passwordErrors.newPassword}
                                            </p>
                                        )}
                                    </div>

                                    {/* CONFIRM PASS */}
                                    <div>
                                        <label className="font-medium mb-1 block">
                                            Xác nhận mật khẩu
                                        </label>

                                        <div className="relative">
                                            <input
                                                type={showPassword.confirm ? "text" : "password"}
                                                name="confirmPassword"
                                                value={passwords.confirmPassword}
                                                onChange={handlePasswordChange}
                                                className="input-tiki pr-12"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword({
                                                        ...showPassword,
                                                        confirm: !showPassword.confirm,
                                                    })
                                                }
                                                className="pass-eye-btn"
                                            >
                                                <EyeIcon isOpen={showPassword.confirm} />
                                            </button>
                                        </div>

                                        {passwordErrors.confirmPassword && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {passwordErrors.confirmPassword}
                                            </p>
                                        )}
                                    </div>

                                    <button className="btn-tiki">Đổi mật khẩu</button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default MyAccount;
