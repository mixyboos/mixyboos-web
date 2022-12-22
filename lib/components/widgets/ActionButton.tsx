import React from 'react';

interface IActionButtonProps {
  children: React.ReactNode;
  count?: number;
}

const ActionButton: React.FC<IActionButtonProps> = ({ children, count }) => {
  return (
    <div className='flex text-gray-600 transition duration-200 cursor-pointer hover:text-gray-900 '>
      <svg
        className='w-6'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        {children}
      </svg>
      <div className='-mt-0.5 text-sm'>{count}</div>
    </div>
  );
};
export default ActionButton;
