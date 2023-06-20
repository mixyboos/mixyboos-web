import {generateSasToken} from "@/lib/services/azure/sas-token";
import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";
import {z} from "zod";

export const uploadRouter = createTRPCRouter({
  getSASToken: publicProcedure
    .input(z.object({containerName: z.string()}))
    .query(async ({input: {containerName}}) => {
      const token = await generateSasToken("mixyboos", containerName);
      return token;
    }),
});
