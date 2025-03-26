import FooterComponent from "@/components/footer";
import { cookies } from "next/headers";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { AppTopbar } from "@/components/navigation/app-topbar";

const LoggedInLayout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false";
  console.log("layout", "sidebar_state", defaultOpen);
  const _getSidebar = () => {
    return <AppSidebar variant="inset" />;
  };
  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
        } as React.CSSProperties
      }
    >
      {_getSidebar()}
      <SidebarInset>
        <AppTopbar />
        <div className="flex flex-1 flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
    // <div className="relative min-h-screen flex flex-col md:flex">
    //   <span>This is logged in stuff?</span>
    //   {/* <div className="fixed top-0 left-0 right-0 z-50">
    //     <Navbar />
    //   </div>
    //   <main className="grow mx-8 pt-16 pb-16 mt-4">{children}</main>
    //   <footer className="fixed bottom-0 left-0 right-0">
    //     <FooterComponent />
    //   </footer> */}
    // </div>
  );
};

export default LoggedInLayout;
