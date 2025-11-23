"use client";

import Breadcrumb from "../Common/Breadcrumb";
import WishListSingleItem from "./WishListSingleItem";
import { useWishlist } from "@/hook/useWishlist";

export const Wishlist = () => {
    const { wishlist: items } = useWishlist();

    return (
        <>
            <Breadcrumb title="Wishlist" pages={["Wishlist"]} />

            <section className="overflow-hidden py-20 bg-gray-2">
                <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
                    <div className="flex items-center justify-between mb-7.5">
                        <h2 className="text-dark text-2xl font-medium">Danh sách yêu thích của bạn</h2>
                    </div>

                    <div className="bg-white rounded-[10px] shadow-1">
                        <div className="w-full overflow-x-auto">
                            <div className="min-w-[1170px]">
                                {/* HEADER */}
                                <div className="flex items-center py-5.5 px-10">
                                    <div className="min-w-[83px]"></div>
                                    <div className="min-w-[387px] text-dark">Sách</div>
                                    <div className="min-w-[205px] text-dark">Tác giả</div>
                                    <div className="min-w-[205px] text-dark">Giá tiền</div>
                                    <div className="min-w-[150px] text-dark text-right">Action</div>
                                </div>

                                {/* ITEMS */}
                                {items.length > 0 ? (
                                    items.map((item) => (
                                        <WishListSingleItem key={item.bookId} item={item} />
                                    ))
                                ) : (
                                    <p className="text-center py-10 text-gray-500">
                                        Danh sách yêu thích của bạn còn trống !
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
