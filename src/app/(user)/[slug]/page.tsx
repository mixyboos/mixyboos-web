import UserPage from "@/pages/user/user-page";

export default async function UserSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <UserPage slug={slug} />;
}
