import React from "react";
import getData from "./data";
import ListPlayer from "@/components/widgets/audio/list-audio-player";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { LinkButton } from "@/components/widgets/link-button";
import HeroSection from "@/components/widgets/hero-section";

interface MixesPageProps {
  params: {
    username: string;
  };
}

const MixesPage: React.FC<MixesPageProps> = async ({
  params,
}: MixesPageProps) => {
  const session = await getServerSession();

  const mixes = await getData(params.username);
  return (
    <div className="px-8">
      <div className="m-8 flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Mixes for {params.username || params.username}
        </h2>
        <div className="flex items-center gap-x-1.5">
          {session && (
            <LinkButton href="/mix/create">
              <Icons.mix className="mr-2 h-4 w-4" /> Upload
            </LinkButton>
          )}
          <Button>
            <Icons.share className="mr-2 h-4 w-4" /> Share
          </Button>
          <Button>
            <Icons.play className="mr-2 h-4 w-4" /> Play all
          </Button>
        </div>
      </div>
      <div className="space-y-4 px-12">
        {mixes.length === 0 ? (
          <HeroSection
            title="It's a bit lonely here"
            description="Why not upload some mixes?"
            imageSrc="/img/lonely.jpeg"
            actionHref="/mix/create"
            actionText="Create mix"
            actionIcon={<Icons.mix className="mr-2 h-4 w-4" />}
          />
        ) : (
          mixes.map((mix) => (
            <div key={mix.id}>
              <ListPlayer mix={mix} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MixesPage;
