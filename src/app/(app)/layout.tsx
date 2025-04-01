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

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
        } as React.CSSProperties
      }
    >
      {/* Main container that takes full viewport */}
      <div className="flex flex-col min-h-screen w-full">
        {/* Main content area that expands to fill available space */}
        <div className="flex flex-grow w-full">
          {/* Sidebar with fixed width */}
          <AppSidebar variant="inset" />

          {/* Content area that takes all remaining width */}
          <SidebarInset className="flex flex-col flex-grow max-w-full m-0 p-0 rounded-none shadow-none">
            <AppTopbar />
            <main className="flex-grow w-full overflow-auto p-4">{children}</main>
          </SidebarInset>
        </div>

        {/* Footer that takes full width */}
        <footer className="w-full">
          <FooterComponent />
        </footer>
      </div>
    </SidebarProvider>
  );
};

export default LoggedInLayout;
