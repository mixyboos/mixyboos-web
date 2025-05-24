import { type ProfileModel } from ".";

type CreateMixModel = {
  id: string;
  title: string;
  description: string | null;
  isProcessed: boolean;
};
type MixModel = CreateMixModel & {
  slug?: string;
  duration?: number;
  dateUploaded?: string;
  image?: string;
  likeCount: number;
  playCount: number;
  shareCount: number;
  downloadCount: number;
  user?: ProfileModel;
  audioUrl?: string;
  pcmUrl?: string;
  isLiked: boolean;
};
export default MixModel;
export type { CreateMixModel };
