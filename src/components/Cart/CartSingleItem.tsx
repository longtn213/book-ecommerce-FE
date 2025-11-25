"use client";
import {
    TableRow,
    TableCell,
    IconButton,
    Box,
    Typography,
} from "@mui/material";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useCart } from "@/hook/useCart";

export default function CartSingleItem({ item }) {
    const { updateQuantity, removeItems, loadingMap } = useCart();

    const isLoading = loadingMap[item.bookId] === true;

    const handleIncrease = () => {
        if (!isLoading) updateQuantity(item.bookId, item.quantity + 1);
    };

    const handleDecrease = () => {
        if (item.quantity > 1 && !isLoading)
            updateQuantity(item.bookId, item.quantity - 1);
    };

    return (
        <TableRow hover>

            {/* PRODUCT */}
            <TableCell>
                <Box display="flex" alignItems="center" gap={2}>
                    <Image
                        src={item.cartItemUrl?.[0] || "/images/default-book.png"}
                        width={70}
                        height={90}
                        alt={item.title}
                        style={{ borderRadius: 6 }}
                    />
                    <Typography fontWeight={500}>{item.title}</Typography>
                </Box>
            </TableCell>

            {/* PRICE */}
            <TableCell>
                <Typography fontWeight={600}>
                    {item.unitPriceSnapshot.toLocaleString()}₫
                </Typography>
            </TableCell>

            {/* QUANTITY (đã fix logic + disable khi loading) */}
            <TableCell>
                <Box
                    display="flex"
                    alignItems="center"
                    border="1px solid #ccc"
                    borderRadius={1}
                    width="120px"
                    justifyContent="center"
                >
                    <IconButton disabled={item.quantity <= 1 || isLoading} onClick={handleDecrease}>
                        −
                    </IconButton>

                    <Typography width={30} textAlign="center">
                        {item.quantity}
                    </Typography>

                    <IconButton disabled={isLoading} onClick={handleIncrease}>
                        +
                    </IconButton>
                </Box>
            </TableCell>

            {/* SUBTOTAL */}
            <TableCell>
                <Typography fontWeight={600}>
                    {(item.unitPriceSnapshot * item.quantity).toLocaleString()}₫
                </Typography>
            </TableCell>

            {/* DELETE */}
            <TableCell align="right">
                <IconButton
                    color="error"
                    disabled={isLoading}
                    onClick={() => removeItems([item.bookId])}
                >
                    <Trash2 size={20} />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}
