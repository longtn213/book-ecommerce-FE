import { Menu } from "@/types/Menu";
import { Heart, Home, Store, Phone } from "lucide-react";

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
        title: "WishList",
        newTab: false,
        path: "/wishlist",
        icon: <Heart size={16} strokeWidth={1.75} />,
    },
];
