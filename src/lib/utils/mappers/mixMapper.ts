import { type Mix, type User } from "@/db/schema";
import { type MixModel } from "@/lib/models";
import { mapDbAuthUserToUserModel } from "@/lib/utils/mappers/userMapper";

const mapMixToMixModel = (mix: Mix & { user: User }): MixModel => ({
  id: mix.id,
  slug: mix.slug,
  title: mix.title,
  description: mix.description,
  dateUploaded: mix.createdAt.toISOString(),
  image: "/img/streaming-placeholder.jpg", //TODO: "need to do this",
  likeCount: 15,
  playCount: 10,
  shareCount: 6,
  downloadCount: 2,
  user: mapDbAuthUserToUserModel(mix.user),
  audioUrl: `https://cdn.mixyboos.com/audio/mixes/${mix.id}/${mix.id}.m3u8`,
  isProcessed: mix.isProcessed,
});

export { mapMixToMixModel };
