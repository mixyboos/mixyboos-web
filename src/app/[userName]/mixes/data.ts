import {db} from "@/server/db";
import raise from "@/lib/utils/errors";
import {mapMixToMixModel} from "@/lib/utils/mappers/mixMapper";

async function getData(userName: string) {

  const user = await db.query.users.findFirst({
    where: (users, {eq}) => eq(users.username, userName)
  })

  if (!user) {
    return raise("User not found")
  }

  const data = await db.query.mixes.findMany({
    where: (mixes, {eq}) => eq(mixes.userId, user.id),
    with: {
      user: {}
    }
  })
  return {user, mixes: data.map(m => mapMixToMixModel(m))};
}

export default getData;
