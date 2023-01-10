import { UserModel } from '.';

interface MixModel {
  id: string;
  slug?: string;
  title: string;
  description: string;
  dateUploaded: string;
  image?: string;
  audioUrl?: string;
  user?: UserModel;

  isProcessed: boolean;
}
export default MixModel;
