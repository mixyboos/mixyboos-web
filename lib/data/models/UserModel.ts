interface UserModel {
  id: string;
  title: string;
  slug: string;
  displayName: string;
  userName: string;
  profileImage?: string;
  headerImage?: string;
  accessToken: string;
}

export default UserModel;
