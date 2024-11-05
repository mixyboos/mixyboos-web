import User from "@/lib/models/user";
type ProfileModel = {
  slug: string;
  displayName: string | null;
  biography: string | null;
  profileImage: string;
  headerImage: string;
  urls: string[] | null;
} & User;
export default ProfileModel;
