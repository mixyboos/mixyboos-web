import DebugService from '@lib/services/api/debugService';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const service = new DebugService();
  const result = await service.getOsInfo();
  res.status(200).json(result);
};

export default handler;
