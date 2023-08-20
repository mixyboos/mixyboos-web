type ProfileModel = {
  id: string;
  username: string;
  name: string | null;
  email: string;
  bio: string | null;
  profileImage: string;
  headerImage: string;
  urls: string[] | null;
};
export default ProfileModel;
