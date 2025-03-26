import "@/styles/globals.css";
import "@/styles/theme.css";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontVariables } from "@/config/fonts";
import { cn } from "@/lib/utils";
import AppProviders from "@/app/providers";
import { cookies } from "next/headers";
const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const activeTheme = cookieStore.get("active_theme")?.value;
  const isScaled = activeTheme?.endsWith("-scaled");
  return (
    <html lang="en" className="theme-mixboos dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        className={cn(
          "bg-background overscroll-none font-sans antialiased",
          activeTheme ? `theme-${activeTheme}` : "",
          isScaled ? "theme-scaled" : "",
          fontVariables
        )}
      >
        <AppProviders activeTheme={activeTheme}>{children}</AppProviders>
      </body>
    </html>
  );
}
