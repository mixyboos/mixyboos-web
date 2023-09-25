import { type AuthTokenModel } from "@/lib/models";
type ProfileModel = {
  id: string;
  username: string;
  slug: string | null;
  displayName: string | null;
  email: string;
  bio: string | null;
  profileImage: string;
  headerImage: string;
  urls: string[] | null;

  //TODO: this does not need to be here.
  auth?: AuthTokenModel;
};
export default ProfileModel;
