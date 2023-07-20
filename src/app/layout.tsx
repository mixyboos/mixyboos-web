import { fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import Navbar from "@/lib/components/layout/Navbar";
import { cn } from "@/lib/utils";
import { type Metadata } from "next";
import Image from "next/image";
import Providers from "./providers";
import "@/app/globals.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen  bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <div className="md:hidden">
            <h1>Base Layout page {"<"}md</h1>
          </div>
          <div className="hidden flex-col md:flex">
            <div className="border-b bg-background/95 backdrop-blur">
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
