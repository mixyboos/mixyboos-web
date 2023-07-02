type UserModel = {
  id: string;
  username: string;
  name: string | undefined;
  email: string;
  bio: string | undefined;
  profileImage: string | undefined;
  headerImage: string | undefined;
  urls: string[] | undefined;
};
export default UserModel;
