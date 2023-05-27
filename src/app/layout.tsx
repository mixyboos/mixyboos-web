import Navbar from "@/lib/components/layout/Navbar";
import "../styles/globals.css";
import Providers from "./Providers";
import { Raleway } from "next/font/google";
import Image from "next/image";

const font = Raleway({
  subsets: ["latin"],
  display: "swap",
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={font.className}>
      <body>
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
            <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
};
export const metadata = {
  title: "Mixy::Boos",
  description: "Robot Powered Mixes",
};

export default RootLayout;
