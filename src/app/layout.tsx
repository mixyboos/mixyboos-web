import type { Metadata } from "next";
import "@/styles/globals.css";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import AppProviders from "@/app/providers";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="theme-mixboos dark">
      <body
        className={cn("min-h-screen bg-background", fontSans.className, "antialiased")}
        suppressHydrationWarning
      >
        <AppProviders>
          {children}
          <Toaster />
          <Sonner />
        </AppProviders>
      </body>
    </html>
  );
}
