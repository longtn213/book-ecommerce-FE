"use client";

import React, { useEffect } from "react";
import Discount from "./Discount";
import OrderSummary from "./OrderSummary";
import { useAppSelector } from "@/redux/store";
import CartSingleItem from "./CartSingleItem";
import Breadcrumb from "../Common/Breadcrumb";
import Link from "next/link";
import { useCart } from "@/hook/useCart";
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import FreeShipProgress from "@/components/Common/FreeShipProgress";

const Cart = () => {
    const cartItems = useAppSelector((state) => state.cartReducer.items);
    const totalAmount = useAppSelector((state) => state.cartReducer.totalAmount);
    const { clearCart, refresh } = useCart();

    useEffect(() => {
        refresh();
    }, [refresh]);

    return (
        <>
            <Breadcrumb title={"Giỏ hàng"} pages={["Cart"]} />

            {cartItems.length > 0 ? (
                <section className="py-10 bg-gray-1">
                    <div className="max-w-[1170px] mx-auto px-4">

                        {/* FREESHIP */}
                        <div className="mb-6">
                            <FreeShipProgress totalAmount={totalAmount} />
                        </div>

                        {/* HEADER */}
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={3}
                        >
                            <Typography variant="h5" fontWeight={600}>
                                Giỏ hàng của bạn
                            </Typography>

                            <button
                                onClick={clearCart}
                                className="text-blue hover:underline"
                            >
                                Xóa tất cả
                            </button>
                        </Box>

                        {/* CART TABLE */}
                        <Paper elevation={1} className="rounded-xl overflow-hidden">
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow className="bg-gray-50">
                                            <TableCell><b>Sản phẩm</b></TableCell>
                                            <TableCell><b>Giá</b></TableCell>
                                            <TableCell><b>Số lượng</b></TableCell>
                                            <TableCell><b>Tạm tính</b></TableCell>
                                            <TableCell align="right"><b>Thao tác</b></TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {cartItems.map((item) => (
                                            <CartSingleItem key={item.bookId} item={item} />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>

                        {/* SUMMARY */}
                        <div className="flex flex-col lg:flex-row gap-8 mt-10">
                            <Discount />
                            <OrderSummary />
                        </div>
                    </div>
                </section>
            ) : (
                <>
                    <div className="text-center mt-8">
                        <div className="mx-auto pb-7.5">

                            {/* EMPTY CART ICON */}
                            <svg
                                className="mx-auto opacity-60"
                                width="110"
                                height="110"
                                viewBox="0 0 100 100"
                                fill="none"
                            >
                                <circle cx="50" cy="50" r="50" fill="#F3F4F6" />
                                <path
                                    d="M..."
                                    fill="#8D93A5"
                                />
                            </svg>
                        </div>

                        <p className="pb-6 text-gray-600 text-lg">
                            Giỏ hàng của bạn đang trống!
                        </p>

                        <Link
                            href="/shop"
                            className="w-80 mx-auto flex justify-center font-medium text-white bg-blue-600 py-[13px] px-6 rounded-xl hover:bg-blueCustom-dark transition"
                        >
                            Tiếp tục mua sắm
                        </Link>
                    </div>
                </>
            )}
        </>
    );
};

export default Cart;
