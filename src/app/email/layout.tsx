'use client'

import Loader from "@/components/preloader/Loader";
import NotEmailVerifiedMiddleware from "@/middlewares/NotEmailVerifiedMiddleware";
import { useTransition } from "react";


const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isPending] = useTransition();
  return (
    <>
      {isPending ? <Loader />:  <>{children}</>}
    </>
  )
}


const Layout = ({ children }: { children: React.ReactNode }) => {
  return <DashboardLayout>{children}</DashboardLayout>
}

export default Layout

