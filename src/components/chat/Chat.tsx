import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import React from 'react';
import { useSession } from 'next-auth/client';

interface IChatProps {
  showId: string
}

const Chat = ({ showId }: IChatProps) => {
  const [session, loading] = useSession();
  const [message, setMessage] = React.useState('');
  const [connection, setConnection] = React.useState<HubConnection>();
  const [messages, setMessages] = React.useState([]);
  const [isJoined, setIsJoined] = React.useState(false);

  React.useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${process.env.NEXT_PUBLIC_RT_HOST}/chat`)
      .withAutomaticReconnect()
      .build();
    setConnection(newConnection);
  }, []);

  React.useEffect(() => {
    if (connection) {
      connection.start().then((result) => {
        console.log('Chat', 'Connected to chat hub', result);
        connection
          .send(
            'SendMessage',
            session.user.id,
            `${session.user.id}__join__${showId}`,
            showId,
            true
          )
          .then((r) => console.log('Chat', 'Joined show room', r))
          .catch((err) =>
            console.error('Chat', 'Error joining show chatroom', err)
          );
        connection.on('AckJoin', (fromUser: string, show: string) => {
          setIsJoined(show === showId);
        });
        connection.on('ReceiveMessage', (fromUser: string, message: string) => {
          console.log('Chat', 'Message Received', message);
          console.log('Chat', 'Current messages', messages);
          const newMessage = {
            fromUser: fromUser,
            toUser: session.user.id,
            timestamp: new Date(),
            message: message
          };
          setMessages((messages) => [...messages, newMessage]);
          console.log('Chat', 'Messages', messages);
        });
      });
    }
  }, [connection]);

  const sendMessage = () => {
    if (message) {
      console.log('Chat', 'Sending message', session.user);
      connection
        .send('SendMessage', session.user.id, message, showId, false)
        .then(() => setMessage(''));
    }
  };

  return (
    <div className='flex flex-col justify-between h-full bg-white'>
      <div
        id='header'
        className='flex justify-between px-1 py-2 border-b-2 border-gray-200 sm:items-center'
      >
        <div className='flex items-center space-x-4'>
          <div className='flex flex-col leading-tight'>
            <div className='flex items-center mt-1 text-2xl'>
              <span className='mr-3 text-gray-700'>Chat</span>
              <span className='text-green-500'>
                <svg width={10} height={10}>
                  <circle cx={5} cy={5} r={5} fill='currentColor' />
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className='flex items-center space-x-0'>
          <button
            type='button'
            className='inline-flex items-center justify-center w-10 h-10 text-gray-500 transition duration-500 ease-in-out rounded-full hover:bg-gray-300 focus:outline-none'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
              />
            </svg>
          </button>
          <button
            type='button'
            className='inline-flex items-center justify-center w-10 h-10 text-gray-500 transition duration-500 ease-in-out rounded-full hover:bg-gray-300 focus:outline-none'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </button>
        </div>
      </div>

      <div id='body' className='flex-grow'>
        <div
          id='messages'
          className='flex flex-col p-3 space-y-4 overflow-y-auto scrolling-touch scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2'
        >
          {messages &&
          messages.map((message) => (
            <div className='chat-message'>
              <div className='flex items-end'>
                <div className='flex flex-col items-start order-2 max-w-xs mx-2 space-y-2 text-xs'>
                  <div>
                      <span className='inline-block px-4 py-2 text-gray-600 bg-gray-300 rounded-lg rounded-bl-none'>
                        {message.message}
                      </span>
                  </div>
                </div>
                <img
                  src='https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144'
                  alt='My profile'
                  className='order-1 w-6 h-6 rounded-full'
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='px-1 pt-2 pb-2 mb-2 border-t-2 border-gray-200 sm:mb-0'>
        <div className='relative flex'>
          <input
            type='text'
            value={message}
            disabled={session !== null}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={session.user && session.user.id ? 'Say hello!' : 'Login to say hello!'}
            className='w-full py-3 pl-2 text-gray-600 placeholder-gray-600 bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:border-transparent focus:placeholder-gray-400'
          />
          <div className='absolute inset-y-0 right-0 items-center'>
            <button
              type='button'
              className='inline-flex items-center justify-center w-10 h-10 text-gray-500 transition duration-500 ease-in-out rounded-full hover:bg-gray-300 focus:outline-none'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                className='w-6 h-6 text-gray-600'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </button>
            <button
              type='button'
              onClick={sendMessage}
              className='inline-flex items-center justify-center w-12 h-12 text-white transition duration-500 ease-in-out bg-blue-500 rounded-full hover:bg-blue-400 focus:outline-none'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                className='w-6 h-6 transform rotate-90'
              >
                <path
                  d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
