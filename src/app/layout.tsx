import Navbar from "@/lib/components/layout/Navbar";
import "@/styles/globals.css";
import { type Metadata } from "next";
import Providers from "./providers";
import { fontSans } from "@/config/fonts";
import Image from "next/image";
import { cn } from "@/lib/utils/styles";
import { siteConfig } from "@/config/site";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen overflow-y-hidden bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <div className="md:hidden">
            <Image
              src="/examples/dashboard-light.png"
              width={1280}
              height={866}
              alt="Dashboard"
              className="block dark:hidden"
            />
            <Image
              src="/examples/dashboard-dark.png"
              width={1280}
              height={866}
              alt="Dashboard"
              className="hidden dark:block"
            />
          </div>
          <div className="hidden flex-col md:flex">
            <div className="border-b">
              <Navbar className="mx-6" />
            </div>
            <div className="flex-1">{children}</div>
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
