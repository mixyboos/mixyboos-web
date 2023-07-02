type UserModel = {
  id: string;
  username: string;
  name: string | null;
  email: string;
  bio: string | null;
  profileImage: string | null;
  headerImage: string | null;
  urls: string[] | null;
};
export default UserModel;
