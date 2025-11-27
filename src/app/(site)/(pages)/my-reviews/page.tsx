import React from "react";
import {Metadata} from "next";
import {MyReview} from "@/components/Review";

export const metadata: Metadata = {
    title: "BookCommerce | Book E-commerce",
  description: "BookCommerce | Book E-commerce",
  // other metadata
};

const MyReviewPage = () => {
  return (
    <main>
      <MyReview />
    </main>
  );
};

export default MyReviewPage;
