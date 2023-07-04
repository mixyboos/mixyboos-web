import getData from "./data";

const UserPageLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { username: string };
}) => {
  console.log("layout", "username", params);
  const user = await getData(params.username);
  return (
    <>
      <section className="h-500-px relative block">{user.username}</section>
      <div>{children}</div>
    </>
  );
};
export default UserPageLayout;
