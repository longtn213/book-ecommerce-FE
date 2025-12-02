"use client";

import Breadcrumb from "../Common/Breadcrumb";
import WishListSingleItem from "./WishListSingleItem";
import { useWishlist } from "@/hook/useWishlist";
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export const Wishlist = () => {
    const { wishlist: items } = useWishlist();
    const { user } = useAuthContext();
    const router = useRouter();

    /* ============================
       USER CHƯA LOGIN
    ============================ */
    if (!user) {
        return (
            <>
                <Breadcrumb title="Wishlist" pages={["Wishlist"]} />

                <section className="bg-gray-100 py-20">
                    <div className="max-w-[650px] mx-auto px-4">
                        <div className="bg-white border border-gray-200 rounded-xl shadow-md p-10 text-center">

                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Bạn chưa đăng nhập
                            </h2>

                            <p className="text-gray-600 leading-relaxed mb-8">
                                Hãy đăng nhập để tiếp tục các thao tác của bạn.
                            </p>

                            <button
                                onClick={() => router.push("/signin")}
                                className="px-10 py-3 bg-blue text-white text-lg rounded-lg font-medium hover:bg-blue-dark transition"
                            >
                                Đăng nhập ngay
                            </button>

                            <p className="mt-6 text-sm text-gray-500">
                                Sau khi đăng nhập bạn sẽ xem được các sản phẩm yêu thích của mình.
                            </p>
                        </div>
                    </div>
                </section>
            </>
        );
    }

    /* ============================
       WISHLIST PAGE CHÍNH
    ============================ */
    return (
        <>
            <Breadcrumb title="Wishlist" pages={["Wishlist"]} />

            <section className="py-16 bg-gray-50">
                <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">

                    {/* TITLE */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            Danh sách yêu thích của bạn
                        </h2>
                    </div>

                    {/* MAIN CARD */}
                    <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">

                        {/* HEADER */}
                        <div className="grid grid-cols-12 py-4 px-6 bg-gray-100 border-b border-gray-200 font-semibold text-sm text-gray-700">
                            <div className="col-span-1 text-center">Xóa</div>
                            <div className="col-span-5">Sách</div>
                            <div className="col-span-3">Tác giả</div>
                            <div className="col-span-2">Giá tiền</div>
                            <div className="col-span-1 text-center">Action</div>
                        </div>

                        {/* ITEMS */}
                        {items.length > 0 ? (
                            items.map((item) => (
                                <WishListSingleItem key={item.bookId} item={item} />
                            ))
                        ) : (
                            <p className="text-center py-14 text-gray-500 text-base">
                                Danh sách yêu thích của bạn đang trống!
                            </p>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};
