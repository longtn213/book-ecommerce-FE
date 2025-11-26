import React from "react";
import ShopDetailsUI from "@/components/ShopDetails";
import { Metadata } from "next";
import {fetchBookById} from "@/services/bookService";

export const metadata: Metadata = {
    title: "BookCommerce | Book E-commerce",
  description: "BookCommerce | Book E-commerce",
  // other metadata
};

const ShopDetailsPage = () => {
    return (
    <main>
        <ShopDetailsUI />
    </main>
  );
};

export default ShopDetailsPage;
