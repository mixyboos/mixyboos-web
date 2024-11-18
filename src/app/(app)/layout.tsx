import Navbar from "@/components/navigation/navbar";
import FooterComponent from "@/components/footer";

const LoggedInLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="relative min-h-screen flex flex-col md:flex">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <main className="flex-grow mx-8 pt-16 pb-16 mt-4">{children}</main>
      <footer className="fixed bottom-0 left-0 right-0">
        <FooterComponent />
      </footer>
    </div>
  );
};

export default LoggedInLayout;
