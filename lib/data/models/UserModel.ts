interface Follow {
  id: string;
  name: string;
}
interface UserModel {
  id: string;
  slug: string;
  title: string;
  displayName: string;
  biography: string;
  userName: string;
  profileImage?: string;
  headerImage?: string;

  following: Follow[];
  followers: Follow[];
}

export default UserModel;
