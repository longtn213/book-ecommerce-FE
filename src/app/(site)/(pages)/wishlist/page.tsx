import React from "react";
import { Metadata } from "next";
import {Wishlist} from "@/components/Wishlist";

export const metadata: Metadata = {
    title: "BookCommerce | Book E-commerce",
  description: "This is Wishlist Page for NextCommerce Template",
  // other metadata
};

const WishlistPage = () => {
  return (
    <main>
      <Wishlist />
    </main>
  );
};

export default WishlistPage;
