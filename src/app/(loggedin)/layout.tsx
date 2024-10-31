import Navbar from "@/components/navigation/navbar";
import FooterComponent from "@/components/footer";

const LoggedInLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="relative hidden h-screen w-full flex-col md:flex">
      <Navbar />
      <div className="mx-8">{children}</div>
      <footer className="sticky top-[100vh] text-center py-2">
        <FooterComponent />
      </footer>
    </div>
  );
};

export default LoggedInLayout;
