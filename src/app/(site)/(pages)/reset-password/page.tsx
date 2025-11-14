import React from "react";
import {Metadata} from "next";
import ResetPassword from "@/components/Auth/ResetPassword";

export const metadata: Metadata = {
    title: "BookCommerce | Book E-commerce",
    description: "This is Reset Password Page for E-Book Template",
    // other metadata
};

const ResetPasswordPage = () => {
    return (
        <main>
            <ResetPassword />
        </main>
    );
};

export default ResetPasswordPage;
