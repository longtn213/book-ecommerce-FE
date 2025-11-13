"use client";

import React, { useEffect, useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Image from "next/image";
import Orders from "../Orders";
import {
    changePasswordApi,
    getCurrentUser,
    updateUserProfile,
} from "@/services/userService";

const MyAccount = () => {
    const [activeTab, setActiveTab] = useState("account-details");
    const [user, setUser] = useState<any>(null);

    // FORM UPDATE PROFILE
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        gender: "MALE",
        birthDate: "",
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
                const u = await getCurrentUser(); // res.data.data trả về user luôn

                console.log("USER:", u);

                if (u) {
                    setUser(u);

                    setFormData({
                        fullName: u.fullName || "",
                        email: u.email || "",
                        phone: u.phone || "",
                        gender: u.gender || "MALE",
                        birthDate: u.dateOfBirth ? u.dateOfBirth.substring(0, 10) : "",
                        avatarUrl: u.avatarUrl || "",
                    });

                }
            } catch (err) {
                console.log("FETCH USER ERROR:", err);
            }
        }

        fetchUser();
    }, []);


    // PROFILE INPUT CHANGE
    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // SUBMIT UPDATE PROFILE
    const onUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await updateUserProfile({
                ...formData,
                birthDate: formData.birthDate + "T00:00:00",
            });

            alert("Cập nhật thông tin thành công!");
        } catch (err) {
            alert("Có lỗi xảy ra khi cập nhật!");
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
            return alert("Mật khẩu mới không trùng nhau!");
        }

        try {
            await changePasswordApi({
                oldPassword: passwords.oldPassword,
                newPassword: passwords.newPassword,
            });

            alert("Đổi mật khẩu thành công!");

            setPasswords({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch (err) {
            alert("Lỗi đổi mật khẩu!");
        }
    };

    return (
        <>
            <Breadcrumb title={"My Account"} pages={["my account"]} />

            <section className="overflow-hidden py-20 bg-gray-2">
                <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
                    <div className="flex flex-col xl:flex-row gap-7.5">
                        {/* SIDEBAR */}
                        <div className="xl:max-w-[370px] w-full bg-white rounded-xl shadow-1">
                            <div className="flex xl:flex-col">
                                {/* AVATAR */}
                                <div className="hidden lg:flex flex-wrap items-center gap-5 py-6 px-4 sm:px-7.5 xl:px-9 border-r xl:border-r-0 xl:border-b border-gray-3">
                                    <div className="max-w-[64px] w-full h-16 rounded-full overflow-hidden">
                                        {user && (
                                            <Image
                                                key={user.avatarUrl}
                                                src={
                                                    user.avatarUrl || "/images/users/default-avatar.png"
                                                }
                                                alt="user"
                                                width={64}
                                                height={64}
                                            />
                                        )}
                                    </div>

                                    <div>
                                        <p className="font-medium text-dark mb-0.5">
                                            {user?.fullName || "User"}
                                        </p>
                                        <p className="text-custom-xs">{user?.email || ""}</p>
                                    </div>
                                </div>

                                {/* MENU */}
                                <div className="p-4 sm:p-7.5 xl:p-9">
                                    <div className="flex flex-wrap xl:flex-nowrap xl:flex-col gap-4">
                                        <button
                                            onClick={() => setActiveTab("account-details")}
                                            className={`flex items-center rounded-md gap-2.5 py-3 px-4.5 ease-out duration-200 
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
                                            className={`flex items-center rounded-md gap-2.5 py-3 px-4.5 ease-out duration-200 
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
                                            className="flex items-center rounded-md gap-2.5 py-3 px-4.5 text-dark-2 bg-gray-1
                      hover:bg-blue hover:text-white ease-out duration-200"
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
                                    <div className="mb-5">
                                        <label className="block mb-2.5">
                                            Full Name <span className="text-red">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleProfileChange}
                                            className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5"
                                        />
                                    </div>

                                    <div className="mb-5">
                                        <label className="block mb-2.5">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleProfileChange}
                                            className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5"
                                        />
                                    </div>

                                    <div className="mb-5">
                                        <label className="block mb-2.5">Phone</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleProfileChange}
                                            className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5"
                                        />
                                    </div>

                                    <div className="mb-5">
                                        <label className="block mb-2.5">Gender</label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleProfileChange}
                                            className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5"
                                        >
                                            <option value="MALE">Male</option>
                                            <option value="FEMALE">Female</option>
                                            <option value="OTHER">Other</option>
                                        </select>
                                    </div>


                                    <div className="mb-5">
                                        <label className="block mb-2.5">Birth Date</label>
                                        <input
                                            type="date"
                                            name="birthDate"
                                            value={formData.birthDate}
                                            onChange={handleProfileChange}
                                            className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>

                            {/* PASSWORD CHANGE */}
                            <p className="font-medium text-xl mt-10 mb-5">Password Change</p>

                            <form onSubmit={handleChangePassword}>
                                <div className="bg-white shadow-1 rounded-xl p-4 sm:p-8.5">
                                    <div className="mb-5">
                                        <label className="block mb-2.5">Old Password</label>
                                        <input
                                            type="password"
                                            name="oldPassword"
                                            value={passwords.oldPassword}
                                            onChange={handlePasswordChange}
                                            className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5"
                                        />
                                    </div>

                                    <div className="mb-5">
                                        <label className="block mb-2.5">New Password</label>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            value={passwords.newPassword}
                                            onChange={handlePasswordChange}
                                            className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5"
                                        />
                                    </div>

                                    <div className="mb-5">
                                        <label className="block mb-2.5">Confirm New Password</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={passwords.confirmPassword}
                                            onChange={handlePasswordChange}
                                            className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5"
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
