import React from "react";
import {Metadata} from "next";
import OrdersList from "@/components/OrdersUser/OrderList";

export const metadata: Metadata = {
    title: "BookCommerce | Book E-commerce",
  description: "BookCommerce | Book E-commerce",
  // other metadata
};

const MyOrdersPage = () => {
  return (
    <main>
      <OrdersList />
    </main>
  );
};

export default MyOrdersPage;
