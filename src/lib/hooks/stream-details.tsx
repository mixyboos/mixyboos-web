import * as React from "react";
import LiveService from "../services/api/live-service";
import ProfileService from "../services/api/profile-service";

export const useStreamDetails = () => {
  const [streamKey, setStreamKey] = React.useState<string>();
  const [streamHost, setStreamHost] = React.useState<string>();

  React.useEffect(() => {
    // const liveService = new LiveService(session?.user.accessToken);
    // const profileService = new ProfileService(session?.user.accessToken);
    const liveService = new LiveService();
    const profileService = new ProfileService();

    const loadUserStreamDetails = async () => {
      setStreamKey((await profileService.getStreamKey())?.apiKey);
      setStreamHost(await liveService.getStreamHost());
    };
    loadUserStreamDetails();
  }, []);

  return { streamKey, streamHost };
};
