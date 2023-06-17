type UserModel = {
  username: string;
  name: string;
  email: string;
  bio: string | null;
  profileImage: string | null;
  headerImage: string | null;
  urls: string[];
};
export default UserModel;
