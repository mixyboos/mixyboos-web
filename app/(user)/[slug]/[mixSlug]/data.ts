import { MixModel } from '@lib/data/models';
import MixService from '@lib/services/api/mixService';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '@pages/api/auth/[...nextauth]';
export async function fetchMix(
  userSlug: string,
  mixSlug: string
): Promise<MixModel | undefined> {
  const session = await unstable_getServerSession(authOptions);
  if (!session) return undefined;

  const mixService = new MixService(session.user.accessToken);
  return mixService.getByUserAndSlug(userSlug, mixSlug);
}
