"use client";

import AuthMiddleware from "@/middlewares/AuthMiddleware";


const Layout = ({ children }: { children: React.ReactNode }) => {
    return <AuthMiddleware>{children}</AuthMiddleware>
}

export default Layout