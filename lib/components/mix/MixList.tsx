import React from 'react';
import { MixModel } from '@lib/data/models';
import { MainPlayer } from '@lib/components/audio/players';

interface IMixListProps {
  mixes: MixModel[];
}

const MixList = ({ mixes }: IMixListProps) => {
  return (
    <React.Fragment>
      {!mixes ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {mixes?.map((r) => (
            <MainPlayer
              key={r.id}
              mix={r}
            />
          ))}
        </div>
      )}
    </React.Fragment>
  );
};
export default MixList;
