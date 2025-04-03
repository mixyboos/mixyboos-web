import { AuthProvider } from "@/lib/contexts/auth/auth-context";
import { ThemeProvider } from "@/components/theme/theme-provider";
import AudioProvider from "@/lib/contexts/audio-provider";
import QueryProvider from "@/app/query-client.provider";
import { ActiveThemeProvider } from "@/components/theme/active-theme";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@/components/analytics/analytics";
type AppProvidersProps = {
  activeTheme: string | undefined;
  children: React.ReactNode;
};
const AppProviders: React.FC<AppProvidersProps> = async ({ activeTheme, children }) => {
  return (
    <QueryProvider>
      <AuthProvider>
        <AudioProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            enableColorScheme
          >
            <ActiveThemeProvider initialTheme={activeTheme}>
              {children}
              <Toaster />
              <Analytics />
            </ActiveThemeProvider>
          </ThemeProvider>
        </AudioProvider>
      </AuthProvider>
    </QueryProvider>
  );
};

export default AppProviders;
