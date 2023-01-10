import React from 'react';
import { MixList } from '@lib/components/mix';
import { Loading } from '@lib/components/widgets';
import { PropsWithChildren } from 'react';
import { MixModel } from '@lib/data/models';

interface IDashboardPageControlProps extends PropsWithChildren<any> {
  mixes?: MixModel[];
}

const DashboardPageControl = ({ mixes }: IDashboardPageControlProps) => {
  return <div>{mixes ? <MixList mixes={mixes} /> : <Loading />}</div>;
};

export default DashboardPageControl;
