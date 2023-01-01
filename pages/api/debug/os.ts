import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(authOptions);
  console.log('API', 'os', session);
  if (!session) {
    res.status(401);
  } else {
    console.log('TOKEN', session);
    res.status(200).json({
      argle: 'bargle',
    });
  }
  res.end();
};

export default handler;
