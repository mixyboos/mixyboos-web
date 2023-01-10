import { NextApiRequest, NextApiResponse } from 'next';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import TokenPayload from '@lib/data/models/TokenPayload';
import logger from '@lib/logger';

const token = {
  access_token:
    'eyJhbGciOiJBMjU2S1ciLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwidHlwIjoiYXQrand0IiwiY3R5IjoiSldUIn0.N204qFuw5hETXyEofSyLbPuGMB_BiJ-DV8rHzK0HwmWyntf0CIIHr1H-3Yjt5kQN4rv0Gs6IMXCwxj20rd0q9DIhUEfrnIu4.dTtCXxwJhqdWj17xwRVgNA.Yq1KKLV0QsLVByRrvxr6zgRcoV3jKl9U6ipfUpqpypyqnRqBQr988ZUJuGd_zOAH0ZsjmzW6KZ2xpfbmV4rsurQLnEbVjhV7CA3PzjAV05HH9tKJsPqVCt4JH9iOPLgpneJW7VHxzYuI7nzd1ZV2O-ICjuH0be66jrY0fs8lKNk6VVAhgyY4lRSz_qcKOHoKQxtf9A0OZi2Wm4xeC4BKwgyqG9ZSIp0QBOuvMeb_YVUlQgnTWWVqUzjunmU5GNgfTxlcxpm5YBwJfy3TmNkCVi2Zw70tS2Sb6bjU-e7SiffB53NDHnIKjBdjVxmbIuNgGa31Xd4EhbskkAqc-saTLB-YmIYE9XpMliwPLXgTKYsA8QK_-lX6f9xZuwfo0Lbok6W8pr-_KYpRt3OvL2PBA8B3KQie_6pYwQtpCXIJd1xQCMFnxLwCfMTD9_Tchx6fAIrD60IrJA7ygoZIRgd4a9n--YThtcYQKOze0yD2ceB1omFNjQ6fe5zsLhO9haa6AJBy-pS3Btpwjj_yb3_N_yUDTjboP6XIydudDrq_PKCb0CMUQh7plfr4ECJD_7I6RQ5E8XJbmsBsTvXYlfyLWPjwTdA-fC8XcZQvnbLv76eEeJHD91-ZcMY0GlXDpVU0Ogn8AZYWhnFtmv986k7x4fFGQ1dqYMWFPdh14HG3-Fx8p1GKZjEamKKNMt4KiGRJ1RwDH5S9pZK1KihYhmjWIP2d9kimwaGMl6-yJuoFh6Va6-CI_jmaKX-Q826GA75QugRQ4McL3jG22sF3lBadEKLhj5Hw95-StRFSJP-qRv5oDg5HTiHiZKsn7JD2lolQxi5J8GehLl6NdGTdV3MF-a5lwQbLDABod_H-j8xrhPjybylYFNugUqL8b3pw3hE0gQ2CcbuZyAKsxOOAUY6ewQDd56lQ2v49DcjXnVUSybz-I5xaaZ22FJKGSJHRLjt9Pnqaai1fxtnZhiJvyJv0im0-F5FxBCYn-aKblXV4t3zCGxYdESjkqYgriXMlJwAr_pqseOB_wjPEheyzp_GaI8ofYrRyTOkEl0ViO56NgxvGEDrLce8AZHCdBbvEDC7_EY1OTDE4aUlicTZGyg1sSRbdEPjPqtMBXWKW8U2qiwhZa3r_5z3MYnGHS1bN0DfMtZSfzIs-_VrNQ_HQnVdyacKzh8oq9z3Xedw-jUNvgmghuKIZMi739xv-0aE674ik6V-DvJamMyX63qJi1atlGheEI9jYfwhbVlcHIwI0VZOISbY9Jhv5TRgccBDGLlDs07I4_qjcsLsbvYLpa9Yq37vOvIK948ltPr4fSIdcQ8bjy4QU_sh0XIR0THEqPPVRAgRz0c0dDHhFi-Nn9BRUS9v0oV0zPvy89okM92qEOmDHOjbsM9h0Ry4lexNoiX2NqRnwnsiYy-X7xHYrmcGg9QebzMCsOKBNffN_Y8nFOnGi33dajw5LxS6gc32pO1CaqlzpafLWn_CUGgQ98F8pgp1wDuIM18c3zxNWdS3nDQUwJLALpO_5A4YZVKP2JvjvyrSpTqVMAV3Aqtmm9nCJfQMcIIoLz8K9_zLUr0dA3M2nvGf2mPpCV5dGgHLmElCMA8zmshI0CZ6a8Cvqex6pLQ.MSc8Owepc-rheeqkg3oaxrxx-aDmsvSUwY3EW9qZQTM',
  token_type: 'Bearer',
  expires_in: 2627999,
  id_token:
    'eyJhbGciOiJSUzI1NiIsImtpZCI6IkRBOUNFNzg3QUZGNDA3NUY5MEExMzEwNTQ1OTgwQjU5MEU1RUNENzMiLCJ4NXQiOiIycHpuaDZfMEIxLVFvVEVGUlpnTFdRNWV6WE0iLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiI0NTI5Njc1Ni0xOTlhLTQxMzItOTBlMS1iNzBjMGU1NDcxYmQiLCJhenAiOiJ3ZWJjbGllbnQiLCJhdF9oYXNoIjoicWxEd3hpOTdCTklQLUhwSXpEd2d3dyIsIm9pX3Rrbl9pZCI6IjMwYWVmNjRmLWE0ZmItNGMwMi04Y2ZhLTA5OGEwYmFjMWU2NCIsImF1ZCI6IndlYmNsaWVudCIsImV4cCI6MTY3NTY5MzYwNiwiaXNzIjoiaHR0cDovL2FwaS5taXh5Ym9vcy5jb20vIiwiaWF0IjoxNjczMDY1NjA2fQ.SqXBH059Egsf73uokO3-2ZCjXKCKVqKiOj8Xu8i4vbnKiokrarCqo2t28y5SdAQ7ap3Eq3lb0avcv01KXNu-iN0Cr580Mvr5zbpiDjPw8eyye8Rkco3Rwdlc65pavpoqFfHm2Fx9fxorXM1jhpEEjqeS4Evf1yPskjDDWk5P_ZhI1WYujH7A_1tpVyqmQF27xODUHSnQ_seiD6mn-tzVvf22dWjzii9zrJNE4GK6Gfgu6aJLGDl0J1b_GTkaTBxFK1XUkwhjR8q-YBt18jGJuelQiLNGtwcjFK0lWgbpsjHI_qS5jVE_V1HHS6C9twDLz41aLPN95nu07ZEbjQ-jNw',
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const decodedToken = jwt_decode<JwtPayload & TokenPayload>(
    token.access_token
  );

  logger.debug(decodedToken);
  res.status(200).json({
    argle: 'bargle',
  });
};

export default handler;