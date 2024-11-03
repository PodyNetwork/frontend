'use client'

import AsideNav from "@/components/dashboard/widgets/asideNav"
import Loader from "@/components/preloader/Loader";
import AuthMiddleware from "@/middlewares/AuthMiddleware";
import { useTransition } from "react";


const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isPending, startTransition] = useTransition();
  return (
    <>
      {isPending && <Loader />}
      <section className="flex flex-col relative">
        <AsideNav />
        {children}
      </section>
    </>
  )
}


const Layout = ({ children }: { children: React.ReactNode }) => {
  return <AuthMiddleware><DashboardLayout>{children}</DashboardLayout></AuthMiddleware>
}

export default Layout

