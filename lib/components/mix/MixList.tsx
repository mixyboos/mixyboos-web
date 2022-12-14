import React, { useState } from 'react';
import { MixModel } from '@lib/data/models';
import MixListItem from './MixListItem';

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
            <MixListItem key={r.id} mix={r} />
          ))}
        </div>
      )}
    </React.Fragment>
  );
};
export default MixList;
