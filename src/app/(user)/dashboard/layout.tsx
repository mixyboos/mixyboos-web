import { AppSidebar } from "@/components/navigation/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const defaultOpen = true;
  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
        } as React.CSSProperties
      }
    >
      <div className="flex flex-col h-screen w-full">
        <div className="flex w-full flex-1 overflow-hidden">
          <AppSidebar variant="inset" />
          <SidebarInset className="flex flex-col flex-grow max-w-full m-0 p-0 rounded-none shadow-none">
            <main className="w-full overflow-auto p-4">{children}</main>
          </SidebarInset>
        </div>
        <footer className="w-full">{/* <FooterComponent /> */}</footer>
      </div>
    </SidebarProvider>
  );
}
