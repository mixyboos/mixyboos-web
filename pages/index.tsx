import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { MixList } from '@lib/components/mix';
import { getSession } from 'next-auth/react';
import MixService from '@lib/services/api/mixService';

export default function Home() {
  return (
    <div className='p-5 mt-6 overflow-y-auto'>
      <div className='mx-24 mt-6'>
        <MixList mixes={mixes} />
      </div>
    </div>
  );
}


export async function getServerSideProps(ctx) {
  try {
    const session = await getSession(ctx);
    const mixService = new MixService(session?.accessToken as string | null);
    const mixes = await mixService.getMixes();

    return {
      props: {
        mixes: mixes
      }
    };
  } catch (err) {
    console.log('index', 'getServerSideProps', err);
    if (err?.message.startsWith('Error: connect ECONNREFUSED')) {
      //server gone brrr
      return {
        redirect: {
          permanent: false,
          destination: `/error`
        }
      };
    }

    return {
      redirect: {
        permanent: false,
        destination: `/login?redirectUri=${process.env.NEXTAUTH_URL}`
      }
    };
  }
}
