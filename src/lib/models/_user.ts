//base user type which can be shared among
// 1. (private) ProfileModel
// 2. (public) UserModel
// IMPORTANT: This model should not contain any private data
// it should also not contain any data this isn't important to the private ProfileModel
// eg. following, followers etc
// it should only contain common data that are directly editable by the owner
export type _User = {
  slug: string;
  displayName: string;
  title: string | null;
  biography: string | null;
  profileImage: string;
  headerImage: string;
  urls: Array<string> | null;
};
