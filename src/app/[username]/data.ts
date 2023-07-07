import { db } from "@/server/db";
import raise from "@/lib/utils/errors";
import { mapDbAuthUserToUserModel } from "@/lib/utils/mappers/userMapper";
import { mapMixToMixModel } from "@/lib/utils/mappers/mixMapper";

async function getData(username: string) {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
  });

  if (!user) {
    return raise("User not found");
  }

  const mixes = await db.query.mixes.findMany({
    where: (mixes, { eq }) => eq(mixes.userId, user.id),
    limit: 10,
    with: {
      user: {},
    },
  });

  return {
    user: mapDbAuthUserToUserModel(user),
    mixes: mixes.map((m) => mapMixToMixModel(m)),
  };
}

export default getData;
