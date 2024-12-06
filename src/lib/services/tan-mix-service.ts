import { MixModel, ProfileModel } from "@/lib/models";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/services/api/api-client";
import logger from "@/lib/logger";
import { StatusCodes } from "http-status-codes";
import { getUserMixes } from "@/lib/services/api/mix-service";

export const useGetUserMixesQuery = (profile: ProfileModel | undefined) => {
  return useQuery({
    queryKey: ["user-mixes"],
    queryFn: async () => {
      try {
        if (!profile) return null;
        return await getUserMixes(profile.slug);
      } catch (err) {
        console.error(err);
        return Promise.reject(err);
      }
    },
  });
};

export const useToggleMixLike = (mix: MixModel) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      try {
        const response = await api.post(`/mix/togglelike?id=${mix.id}`);
        if (response.status !== StatusCodes.OK)
          throw new Error("Network response was not ok");
        return response.data as Promise<MixModel>;
      } catch (err) {
        logger.error("tan-mix-service", "toggle-mix-like", err);
      }
    },
    // onSuccess: (item) => {
    //   queryClient.setQueryData(["user-mixes"], (prev: MixModel[]) =>
    //     prev?.map((mix: MixModel) => {
    //       console.log("tan-mix-service", "mapping", mix);
    //       mix.id === item?.id ? item : mix;
    //     })
    //   );
    // },
  });
};
