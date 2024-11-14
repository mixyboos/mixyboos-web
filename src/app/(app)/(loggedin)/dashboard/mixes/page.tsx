import MixListPage from "@/components/pages/mix/mix-list";
import LargeAudioPlayer from "@/components/widgets/audio/large-audio-player";
import { useAuth } from "@/lib/contexts/auth/auth-context";
import { getByUserAndSlug, getUserMixes } from "@/lib/services/api/mix-service";

const MyMixes = async () => {
  return (<MixListPage />
  );
};

export default MyMixes;
