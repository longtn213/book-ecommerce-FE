import Contact from "@/components/Contact";

import { Metadata } from "next";
export const metadata: Metadata = {
    title: "BookCommerce | Book E-commerce",
  description: "This is Contact Page for NextCommerce Template",
  // other metadata
};

const ContactPage = () => {
  return (
    <main>
      <Contact />
    </main>
  );
};

export default ContactPage;
