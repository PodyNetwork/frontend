import AsideNav from "@/components/dashboard/widgets/asideNav"

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className="flex flex-row relative">
        <AsideNav />
        {children}
      </section>
    )
  }