import { db } from "@/server/db";
import raise from "@/lib/utils/errors";

async function getData(username: string) {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
  });

  if (!user) {
    return raise("User not found");
  }
  return user;
}

export default getData;
