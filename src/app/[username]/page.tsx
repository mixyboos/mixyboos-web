import UserPage from "@/components/pages/user/user-page";
import getData from "./data";
const UserPageLayout = async ({ params }: { params: { username: string } }) => {
  const { user, mixes } = await getData(params.username);
  return <UserPage user={user} mixes={mixes} />;
};
export default UserPageLayout;
