import React from "react";
import Shop from "@/components/ShopWithSidebar";

import { Metadata } from "next";
export const metadata: Metadata = {
    title: "BookCommerce | Book E-commerce",
  description: "BookCommerce | Book E-commerce",
  // other metadata
};

const ShopPage = () => {
  return (
    <main>
      <Shop />
    </main>
  );
};

export default ShopPage;
