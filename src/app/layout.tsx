import Navbar from "@/lib/components/layout/Navbar";
import "./globals.css";
import Providers from "./Providers";
import { Raleway } from 'next/font/google';


const font = Raleway({
  subsets: ["latin"],
  display: "swap",
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={font.className}>
      <Providers>
        <body>
          <Navbar />
          <div className="bg-gray-50 pt-16 dark:bg-gray-900">{children}</div>
        </body>
      </Providers>
    </html>
  );
};
export const metadata = {
  title: "Mixy::Boos",
  description: "Robot Powered Mixes",
};

export default RootLayout;
