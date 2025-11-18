import { useEffect, useState } from "react";
import {getUserNotifications, markAllNotificationsRead} from "@/services/userService";

export function useNotifications(username?: string) {
    const [notifications, setNotifications] = useState([]);
    const [unread, setUnread] = useState(0);

    useEffect(() => {
        if (!username) return;

        const fetchData = async () => {
            const data = await getUserNotifications();
            setNotifications(data);
            setUnread(data.filter(n => !n.read).length);
        };

        fetchData();
    }, [username]);

    // ⭐ dùng khi mở popup
    const markAllAsRead = async () => {
        try {
            await markAllNotificationsRead();

            setNotifications(prev =>
                prev.map(n => ({ ...n, read: true }))
            );

            setUnread(0);
        } catch (err) {
            console.error("Mark read failed", err);
        }
    };

    return {
        notifications,
        unread,
        setNotifications,
        setUnread,
        markAllAsRead,
    };
}
