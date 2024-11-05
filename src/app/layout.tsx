import type { Metadata } from "next";
import "@/styles/globals.css";
import { AuthProvider } from "@/lib/contexts/auth/auth-context";
import { ThemeProvider } from "@/components/theme-provider";
import AudioProvider from "@/lib/contexts/audio-provider";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

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
        className={cn(
          "min-h-screen bg-background",
          fontSans.className,
          "antialiased"
        )}
        suppressHydrationWarning
      >
        <AuthProvider>
          <AudioProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </AudioProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
