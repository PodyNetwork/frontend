'use client'

import AsideNav from "@/components/dashboard/widgets/asideNav";
import AuthMiddleware from "@/middlewares/AuthMiddleware";


const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <>
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

