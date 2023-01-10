import React from 'react';
import { IUserMixPageParams } from './params';
import { fetchMix } from './data';

const Head = async ({ params }: IUserMixPageParams) => {
  const mix = await fetchMix(params.slug, params.mixSlug);
  return (
    <>
      <title>{mix?.title}</title>
    </>
  );
};

export default Head;
