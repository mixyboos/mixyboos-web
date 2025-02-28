import { type ProfileModel } from ".";

export type CreateMixModel = {
  id: string;
  title: string;
  description: string | null;
  isProcessed: boolean;
};
export type MixModel = CreateMixModel & {
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
