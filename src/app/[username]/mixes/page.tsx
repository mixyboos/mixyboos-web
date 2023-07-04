import React from "react";
import getData from './data'
import MainPlayer from "@/components/widgets/audio/large-audio-player";
import {Icons} from "@/components/icons";
import {Button} from "@/components/ui/button";

interface MixesPageProps {
  params: {
    username: string;
  };
}

const MixesPage: React.FC<MixesPageProps> = async ({
                                                     params,
                                                   }: MixesPageProps) => {
  const {user, mixes} = await getData(params.username)
  return (<div>
    <div className="flex items-center justify-between space-y-2"><h2
      className="text-3xl font-bold tracking-tight">Mixes for {user.name || user.username}</h2>
      <div className="flex items-center space-x-2">
        <div className="grid gap-2">
          <Button>
            <Icons.share className="mr-2 h-4 w-4"/> Share
          </Button>
        </div>
        <Button>
          <Icons.play className="mr-2 h-4 w-4"/> Play all
        </Button>
      </div>
    </div>
    <div className="space-y-4">
      {mixes.map(mix => (<div key={mix.id}>
        <div className="border-b-2">
          <MainPlayer mix={mix}/>
        </div>
      </div>))}
    </div>
  </div>);
};

export default MixesPage;
