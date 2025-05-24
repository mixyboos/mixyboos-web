"use client";
import MixListPage from "@/components/pages/mix/mix-list-page";
import { useGetMyMixesQuery } from "@/lib/services/tan-mix-service";

const MyMixes = () => {
  const mixQuery = useGetMyMixesQuery();
  const mixes = mixQuery.data;
  return <MixListPage mixes={mixes} />;
};

export default MyMixes;
