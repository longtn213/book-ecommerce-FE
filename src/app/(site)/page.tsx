import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BookCommerce | Book E-commerce",
  description: "This is Home for BookCommerce",
  // other metadata
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
