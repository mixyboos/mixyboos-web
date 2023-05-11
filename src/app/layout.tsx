import Navbar from "@/lib/components/layout/Navbar";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import Providers from "./Providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <Navbar />
          <div className="pt-16">{children}</div>
        </body>
      </html>
    </Providers>
  );
}
export const metadata = {
  title: "Mixy::Boos",
  description: "Robot Powered Mixes",
};
