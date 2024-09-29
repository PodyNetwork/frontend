import AsideNav from "@/components/dashboard/widgets/asideNav"

export default function DashboardLayout({
    children, 
  }: {
    children: React.ReactNode
  }) {
    return (
      <>
        <section className="flex flex-col relative">
          <AsideNav />
          {children}
        </section>
      </>
    )
  }