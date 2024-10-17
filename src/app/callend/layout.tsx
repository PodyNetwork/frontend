"use client";

import AuthMiddleware from "@/middleware/AuthMiddleware";


const Layout = ({ children }: { children: React.ReactNode }) => {
    return <AuthMiddleware>{children}</AuthMiddleware>
}

export default Layout