import { useAuth } from "@/lib/contexts/auth/auth-context";
import logger from "@/lib/logger";

const DebugPage = () => {
  const { user, logout } = useAuth();
  return (
    <div>
      <h1>Welcome {user?.slug}</h1>
      <button
        onClick={async () => {
          logger.debug("debug", "logout", user);
          if (logout) {
            const done = await logout();
            if (done) {
              logger.debug("debug", "logout", "done");
            }
          }
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default DebugPage;
