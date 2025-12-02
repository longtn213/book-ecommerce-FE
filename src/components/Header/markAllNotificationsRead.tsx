"use client";

import { useEffect, useRef } from "react";
import { useNotifications } from "@/hook/useNotifications";
import useNotificationWS from "@/hook/useNotificationWS";

export default function NotificationDropdown({
                                                 user,
                                                 activeDropdown,
                                                 setActiveDropdown,
                                             }) {

    const open = activeDropdown === "notification";
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const toggle = () => {
        setActiveDropdown(open ? null : "notification");
    };

    const {
        notifications,
        unread,
        setNotifications,
        setUnread,
        markAllAsRead
    } = useNotifications(user?.username);

    // ⭐ Websocket realtime
    useNotificationWS(user?.username, (newNotif) => {
        setNotifications((prev) => [newNotif, ...prev]);
        setUnread((prev) => prev + 1);
    });

    // ⭐ Khi mở popup → mark all read
    useEffect(() => {
        if (open && unread > 0) {
            markAllAsRead();
        }
    }, [open, unread, markAllAsRead]);


    return (
        <div ref={dropdownRef} className="relative inline-block">
            {/* BUTTON ICON */}
            <button onClick={toggle} className="relative">
                <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#3C50E0"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 01-3.46 0"></path>
                </svg>

                {unread > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blueCustom text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                        {unread}
                    </span>
                )}
            </button>

            {/* DROPDOWN */}
            {open && (
                <div className="absolute right-0 mt-3 w-[360px] bg-white shadow-2xl border border-gray-200 rounded-xl p-0 z-50">

                    <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                        <p className="font-semibold text-gray-800 text-base">Thông báo</p>

                        {unread > 0 && (
                            <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                                {unread} mới
                            </span>
                        )}
                    </div>

                    <div className="max-h-80 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <p className="text-gray-500 text-sm px-4 py-6 text-center">
                                Không có thông báo
                            </p>
                        ) : (
                            notifications.map((noti, i) => (
                                <div
                                    key={i}
                                    className={`px-4 py-3 cursor-pointer border-b border-gray-100 
                                        hover:bg-gray-50 transition 
                                        ${!noti.read ? "bg-blue-50" : ""}`}
                                >
                                    <p className="font-medium text-sm text-gray-800">{noti.title}</p>
                                    <p className="text-sm text-gray-600 mt-0.5 line-clamp-2">
                                        {noti.content}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {new Date(noti.createdAt).toLocaleString("vi-VN")}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
