import MixService from "@/lib/services/api/mix-service";

async function getData(username: string) {
  const mixes = await new MixService().getUserMixes(username);
  console.log("mixes", "getData", mixes);
  return mixes;
}

export default getData;
