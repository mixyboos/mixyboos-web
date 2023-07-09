import { db } from "@/server/db";

const mixService = {
  getMixAudioUrl: async (mixId: string) => {
    // const mixQuery = await db.query.mixes.findFirst({
    //   where: (mixes, { eq }) => eq(mixes.id, mixId),
    // });

    // if (!mixQuery) {
    //   throw new Error("Unable to find mix");
    // }


    // return `https://argle.bargle/${mixQuery.audioUrl}`;
  },
};

export default mixService;
