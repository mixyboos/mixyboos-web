type UserModel = {
  username: string;
  name: string;
  bio: string | undefined;
  image: string | undefined;
  headerImage: string | undefined;
  sites: string[] | undefined;
};
export default UserModel;
