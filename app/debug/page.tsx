import { authOptions } from 'pages/api/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth';
import React from 'react';

async function getData() {
  const session = await unstable_getServerSession(authOptions);
  console.log('page', 'ServerSession', session);
  const res = await fetch(`${process.env.API_URL}/debug`, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });
  if (res.status === 200) {
    const result = await res.json();
    return result;
  }
  return {
    result: 'Not authenticated',
  };
}

const Page = async () => {
  const data = await getData();
  // return <main>{data ? JSON.stringify(data) : 'Not authenticated'}</main>;
  // const session = await unstable_getServerSession(authOptions);
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Page;
