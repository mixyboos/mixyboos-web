import { type ProfileModel } from ".";

type MixModel = {
  id: string;
  slug?: string;
  title: string;
  description: string | null;
  dateUploaded?: string;
  image?: string;
  likeCount?: number;
  playCount?: number;
  shareCount?: number;
  downloadCount?: number;
  user?: ProfileModel;
  audioUrl?: string;
  isProcessed: boolean;
};
export default MixModel;
