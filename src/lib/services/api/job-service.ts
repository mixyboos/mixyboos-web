import logger from "@/lib/logger";
import ApiService from "@/lib/services/api/api-service";
import { StatusCodes } from "http-status-codes";
class JobService extends ApiService {
  requeProcessMixJob = async (mixId: string): Promise<boolean> => {
    try {
      const result = await this._client.post(
        `job/requeuemix?mixId=${mixId}`,
      );

      return result.status === StatusCodes.ACCEPTED;
    } catch (err) {
      logger.error("Unable to resubmit mix for processing", err);
    }
    return false;
  };
}
export default JobService;
