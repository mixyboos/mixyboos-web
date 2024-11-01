import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/contexts/auth/auth-context";
import logger from "@/lib/logger";

const DebugPage = () => {
  const { profile, logout } = useAuth();
  if (process.env.NODE_ENV === "production") {
    return <div>Debug page is disabled in production</div>;
  }
  return (
    <div>
      <h1>Welcome {profile?.slug}</h1>
      <Button
        onClick={async () => {
          logger.debug("debug", "logout", profile);
          if (logout) {
            const done = await logout();
            if (done) {
              logger.debug("debug", "logout", "done");
            }
          }
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default DebugPage;
