import { siteConfig } from "@/config/site";
import Navbar from "@/lib/components/layout/Navbar";
import { cn } from "@/lib/utils";
import { type Metadata } from "next";
import Providers from "./providers";
import "@/styles/globals.css";
import FooterComponent from "@/components/widgets/footer";
import { fontSans } from "@/config/fonts";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning className="theme-netflix">
      <body className={cn("min-h-screen bg-background", fontSans.className)}>
        <Providers>
          <div className="md:hidden">
            <h1>Base Layout page {"<"}md</h1>
          </div>
          <div className="relative hidden h-screen w-full flex-col md:flex">
            <div className="border-b">
              <Navbar className="mx-6" />
            </div>
            <div className="mx-12">{children}</div>
            <footer className="sticky top-[100vh] text-center py-2">
              <FooterComponent />
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default RootLayout;
