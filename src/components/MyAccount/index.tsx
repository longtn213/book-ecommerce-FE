"use client";

import React, { useEffect, useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Image from "next/image";
import Orders from "../Orders";
import {
    changePasswordApi,
    getCurrentUser,
    updateUserProfile, uploadAvatarApi,
} from "@/services/userService";

import { notification, DatePicker } from "antd";
import dayjs from "dayjs";
import {useAuthContext} from "@/context/AuthContext";

const MyAccount = () => {
    const [activeTab, setActiveTab] = useState("account-details");
    const { user, setUser } = useAuthContext();
    // Notification
    const [api, contextHolder] = notification.useNotification();

    // FORM UPDATE PROFILE
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        gender: "MALE",
        birthDate: null as dayjs.Dayjs | null,
        avatarUrl: "",
    });

    // FORM CHANGE PASSWORD
    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    // LOAD USER
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
                    description: "Có lỗi xảy ra khi tải dữ liệu người dùng",
                });
            }
        }
        fetchUser();
    }, [api, setUser]);

    // PROFILE INPUT CHANGE
    const handleProfileChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // SUBMIT UPDATE PROFILE
    const onUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const payload = {
                fullName: formData.fullName.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                gender: formData.gender,
                dateOfBirth: formData.birthDate
                    ? formData.birthDate.format("YYYY-MM-DD") + "T00:00:00"
                    : null,
                avatarUrl: formData.avatarUrl,
            };

            await updateUserProfile(payload);

            api.success({
                message: "Cập nhật thành công",
                description: "Thông tin tài khoản đã được cập nhật.",
            });

            setUser((prev: any) => ({
                ...prev,
                ...payload,
            }));
        } catch (err: any) {
            api.error({
                message: "Cập nhật thất bại",
                description:
                    err?.response?.data?.message ||
                    "Vui lòng kiểm tra lại thông tin.",
            });
        }
    };

    // PASSWORD INPUT CHANGE
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswords({
            ...passwords,
            [e.target.name]: e.target.value,
        });
    };

    // SUBMIT CHANGE PASSWORD
    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (passwords.newPassword !== passwords.confirmPassword) {
            return api.error({
                message: "Mật khẩu không khớp",
                description: "Vui lòng kiểm tra lại mật khẩu mới.",
            });
        }

        try {
            await changePasswordApi({
                oldPassword: passwords.oldPassword,
                newPassword: passwords.newPassword,
            });

            api.success({
                message: "Đổi mật khẩu thành công",
                description: "Mật khẩu đã được cập nhật.",
            });

            setPasswords({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch (err) {
            api.error({
                message: "Đổi mật khẩu thất bại",
                description: "Mật khẩu cũ sai hoặc có lỗi xảy ra.",
            });
        }
    };

    return (
        <>
            {contextHolder}

            <Breadcrumb title={"My Account"} pages={["my account"]} />

            <section className="overflow-hidden py-20 bg-gray-2">
                <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
                    <div className="flex flex-col xl:flex-row gap-7.5">

                        {/* SIDEBAR */}
                        <div className="xl:max-w-[370px] w-full bg-white rounded-xl shadow-1">
                            <div className="flex xl:flex-col">

                                {/* AVATAR + EDIT giống Facebook */}
                                <div className="relative flex flex-col items-center py-6 px-4 sm:px-7.5 xl:px-9">

                                    {/* Avatar wrapper */}
                                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden
                    border-4 border-white shadow-xl group">

                                        {/* Avatar image */}
                                        <Image
                                            key={formData.avatarUrl}
                                            src={formData.avatarUrl || "/images/profile/user-2.jpg"}
                                            alt="user"
                                            width={128}
                                            height={128}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>

                                    {/* CAMERA BUTTON – nằm ngoài avatar */}
                                    <label
                                        htmlFor="avatarUpload"
                                        className="
                                        absolute top-[110px]
                                        right-[calc(50%-65px)]
                                        sm:right-[calc(50%-65px)]
                                        w-10 h-10
                                        rounded-full
                                        bg-[#E4E6EB]
                                        border border-gray-300
                                        shadow-lg
                                        flex items-center justify-center
                                        cursor-pointer
                                        hover:bg-gray-300
                                        transition
                                    "
                                    >
                                        {/* Icon camera */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            className="w-5 h-5 text-gray-800"
                                        >
                                            <path d="M12 9a3 3 0 100 6 3 3 0 000-6zm7-3h-2.586l-.707-.707A.996.996 0 0015.586 5h-7.17a.996.996 0 00-.707.293L7 6H4a2 2 0 00-2 2v10a2 2 0 002 2h15a2 2 0 002-2V8a2 2 0 00-2-2zm0 12H4V8h3.172l1-1h7.656l1 1H19v10z" />
                                        </svg>
                                    </label>

                                    {/* Hidden upload input */}
                                    <input
                                        id="avatarUpload"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;

                                            const preview = URL.createObjectURL(file);
                                            setFormData((prev) => ({ ...prev, avatarUrl: preview }));

                                            try {
                                                const res = await uploadAvatarApi(file);

                                                if (res.success && res.data) {
                                                    api.success({
                                                        message: "Upload ảnh thành công!",
                                                        description: "Ảnh đại diện đã được cập nhật.",
                                                    });

                                                    setFormData((prev) => ({ ...prev, avatarUrl: res.data }));
                                                    setUser((prev: any) => ({ ...prev, avatarUrl: res.data }));
                                                }
                                            } catch (error) {
                                                api.error({
                                                    message: "Lỗi",
                                                    description: "Không thể upload ảnh.",
                                                });
                                            }
                                        }}
                                    />

                                    {/* USER NAME + EMAIL */}
                                    <div className="text-center mt-4">
                                        <p className="font-semibold text-lg">{user?.fullName}</p>
                                        <p className="text-sm text-gray-500">{user?.email}</p>
                                    </div>
                                </div>


                                {/* MENU */}
                                <div className="p-4 sm:p-7.5 xl:p-9">
                                    <div className="flex flex-wrap xl:flex-nowrap xl:flex-col gap-4">
                                        <button
                                            onClick={() => setActiveTab("account-details")}
                                            className={`flex items-center rounded-md gap-2.5 py-3 px-4.5 transition 
                                                hover:bg-blue hover:text-white ${
                                                activeTab === "account-details"
                                                    ? "text-white bg-blue"
                                                    : "text-dark-2 bg-gray-1"
                                            }`}
                                        >
                                            Account Details
                                        </button>

                                        <button
                                            onClick={() => setActiveTab("orders")}
                                            className={`flex items-center rounded-md gap-2.5 py-3 px-4.5 transition 
                                                hover:bg-blue hover:text-white ${
                                                activeTab === "orders"
                                                    ? "text-white bg-blue"
                                                    : "text-dark-2 bg-gray-1"
                                            }`}
                                        >
                                            Orders
                                        </button>

                                        <button
                                            onClick={() => {
                                                localStorage.removeItem("token");
                                                window.location.href = "/";
                                            }}
                                            className="flex items-center rounded-md gap-2.5 py-3 px-4.5 text-dark-2 bg-gray-1 hover:bg-blue hover:text-white transition"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* ORDERS */}
                        <div
                            className={`xl:max-w-[770px] w-full bg-white rounded-xl shadow-1 ${
                                activeTab === "orders" ? "block" : "hidden"
                            }`}
                        >
                            <Orders />
                        </div>

                        {/* ACCOUNT DETAILS */}
                        <div
                            className={`xl:max-w-[770px] w-full ${
                                activeTab === "account-details" ? "block" : "hidden"
                            }`}
                        >
                            {/* UPDATE PROFILE FORM */}
                            <form onSubmit={onUpdateProfile}>
                                <div className="bg-white shadow-1 rounded-xl p-4 sm:p-8.5">

                                    {/* Full Name */}
                                    <div className="mb-5">
                                        <label className="block mb-2.5">
                                            Họ Và Tên <span className="text-red">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleProfileChange}
                                            className="rounded-md border border-gray-300 bg-gray-100 w-full py-2.5 px-5"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="mb-5">
                                        <label className="block mb-2.5">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleProfileChange}
                                            className="rounded-md border border-gray-300 bg-gray-100 w-full py-2.5 px-5"
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div className="mb-5">
                                        <label className="block mb-2.5">Số Điện Thoại</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleProfileChange}
                                            className="rounded-md border border-gray-300 bg-gray-100 w-full py-2.5 px-5"
                                        />
                                    </div>

                                    {/* Gender */}
                                    <div className="mb-5">
                                        <label className="block mb-2.5">Giới Tính</label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleProfileChange}
                                            className="rounded-md border border-gray-300 bg-gray-100 w-full py-2.5 px-5"
                                        >
                                            <option value="MALE">Male</option>
                                            <option value="FEMALE">Female</option>
                                            <option value="OTHER">Other</option>
                                        </select>
                                    </div>

                                    {/* Birth Date */}
                                    <div className="mb-5">
                                        <label className="block mb-2.5">Ngày Sinh</label>

                                        <DatePicker
                                            value={formData.birthDate}
                                            onChange={(date) =>
                                                setFormData({
                                                    ...formData,
                                                    birthDate: date,
                                                })
                                            }
                                            format="YYYY-MM-DD"
                                            className="my-input-picker w-full"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md"
                                    >
                                        Lưu
                                    </button>
                                </div>
                            </form>

                            {/* PASSWORD CHANGE */}
                            <p className="font-medium text-xl mt-10 mb-5">
                                Thay Đổi Mật Khẩu
                            </p>

                            <form onSubmit={handleChangePassword}>
                                <div className="bg-white shadow-1 rounded-xl p-4 sm:p-8.5">

                                    {/* Old Password */}
                                    <div className="mb-5">
                                        <label className="block mb-2.5">Mật Khẩu Cũ</label>
                                        <input
                                            type="password"
                                            name="oldPassword"
                                            value={passwords.oldPassword}
                                            onChange={handlePasswordChange}
                                            className="rounded-md border border-gray-300 bg-gray-100 w-full py-2.5 px-5"
                                        />
                                    </div>

                                    {/* New Password */}
                                    <div className="mb-5">
                                        <label className="block mb-2.5">Mật Khẩu Mới</label>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            value={passwords.newPassword}
                                            onChange={handlePasswordChange}
                                            className="rounded-md border border-gray-300 bg-gray-100 w-full py-2.5 px-5"
                                        />
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="mb-5">
                                        <label className="block mb-2.5">Xác Nhận Mật Khẩu Mới</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={passwords.confirmPassword}
                                            onChange={handlePasswordChange}
                                            className="rounded-md border border-gray-300 bg-gray-100 w-full py-2.5 px-5"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md"
                                    >
                                        Change Password
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MyAccount;
