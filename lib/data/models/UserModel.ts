interface UserModel {
  id: string;
  slug: string;
  title: string;
  displayName: string;
  biography: string;
  userName: string;
  profileImage?: string;
  headerImage?: string;
}

export default UserModel;
