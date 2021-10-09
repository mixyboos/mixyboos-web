import { useSession } from 'next-auth/client';
import React from 'react';
import LiveService from '../../services/api/liveService';
import { Button } from '../widgets';

interface ICreateShowProps {
  startShow: (title: string) => void
}

const CreateShow = ({ startShow }: ICreateShowProps) => {
  const [session, loading] = useSession();

  const [streamKey, setStreamKey] = React.useState('');
  const [title, setTitle] = React.useState('');

  React.useEffect(() => {
    async function getStreamKey() {
      const streamKey = await new LiveService(session.accessToken).getStreamKey();
      setStreamKey(streamKey);
    }

    if (session) {
      getStreamKey();
    }
  }, [session, loading]);

  return (
    <div className='flex justify-center w-2/3 m-auto'>
      <div className='w-full px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800'>
        <div className='flex items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-8 h-8 text-red-300'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
            />
          </svg>
          <span className='px-2 text-2xl font-semibold text-gray-800'>
            Let's do a Live Stream!
          </span>
        </div>
        <div className='mx-4 mt-4'>
          <div className='pt-0 mb-3'></div>
        </div>
        <div className='mx-4 mt-4'>
          <div className='pt-0 mb-3'>
            <label
              className='block mb-2 text-sm font-bold text-gray-500'
              htmlFor='stream-name'
            >
              Stream Title
            </label>
            <input
              id='stream-name'
              type='text'
              value={title}
              onInput={(e) => setTitle(e.target.value)}
              autoFocus
              placeholder='Live Stream Title'
              className='relative w-full px-3 py-4 text-base text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none focus:outline-none focus:ring'
            />
          </div>
        </div>
        <div className='mx-4 mt-4'>
          <div className='pt-0 mb-3'>
            <label
              className='block mb-2 text-sm font-bold text-gray-500'
              htmlFor='stream-key'
            >
              Your Stream Key Is
            </label>
            <input
              id='stream-key'
              type='text'
              readOnly={true}
              value={streamKey}
              placeholder='Stream key'
              className='relative w-full px-3 py-4 text-base text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none focus:outline-none focus:ring'
            />
          </div>
        </div>
        <div className='flex buttons'>
          <span className='inline-flex ml-auto rounded-md shadow-sm'>
            <Button
              size='md'
              style='primary'
              type='button'
              onClick={() => startShow(title)}
            >
              <svg
                className='w-4 h-4 mr-2 fill-current'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z'
                />
              </svg>
              <span>Let's Go!</span>
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CreateShow;
