import { Menu } from "@/types/Menu";
import { Heart, Home, Store, Phone,ListChecks,Star } from "lucide-react";

export const menuData: Menu[] = [
    {
        id: 1,
        title: "Trang chủ",
        newTab: false,
        path: "/",
        icon: <Home size={16} strokeWidth={1.75} />,
    },
    {
        id: 2,
        title: "Cửa hàng",
        newTab: false,
        path: "/shop",
        icon: <Store size={16} strokeWidth={1.75} />,
    },
    {
        id: 3,
        title: "Liên lạc",
        newTab: false,
        path: "/contact",
        icon: <Phone size={16} strokeWidth={1.75} />,
    },
    {
        id: 4,
        title: "Đơn hàng",
        path: "/orders",
        newTab: false,
        icon: <ListChecks size={16} strokeWidth={1.75} />,
    },
    {
        id: 5,
        title: "Đánh giá của tôi",
        path: "/my-reviews",
        newTab: false,
        icon: <Star size={16} strokeWidth={1.75} />,
    },
    {
        id: 6,
        title: "WishList",
        newTab: false,
        path: "/wishlist",
        icon: <Heart size={16} strokeWidth={1.75} />,
    },
];
