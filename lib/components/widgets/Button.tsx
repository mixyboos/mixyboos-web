import logger from '@lib/logger';
import React, { PropsWithChildren } from 'react';

const ButtonStyle = {
  primary:
    'text-white bg-gradient-to-br from-pink-500 to-voilet-500 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 text-center inline-flex items-center shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform',
  secondary:
    'text-white bg-gradient-to-br from-slate-400 to-slate-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 text-center inline-flex items-center shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform',
  basic:
    'text-slate-600 bg-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 text-center inline-flex items-center shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform',
  delete:
    'text-white bg-gradient-to-br from-red-400 to-red-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 text-center inline-flex items-center shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform',
};

const ButtonSize = {
  sm: 'py-2 px-4 text-xs',
  md: 'py-2 px-4 text-md',
  lg: 'py-3 px-6 text-lg',
};

interface IButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  buttonSize?: 'sm' | 'md' | 'lg';
  buttonStyle?: 'primary' | 'secondary' | 'basic' | 'delete';
  buttonType?: 'submit' | 'reset' | 'button';
}

const Button = ({
  buttonSize = 'md',
  buttonStyle = 'primary',
  buttonType = 'button',
  children,
  ...rest
}: IButtonProps) => {
  const classNames = `${ButtonStyle[buttonStyle ?? 'basic']} ${
    ButtonSize[buttonSize]
  } inline-flex items-center py-2 px-4 rounded transition-all duration-150 ease-linear shadow outline-none`;
  return (
    <button
      type={buttonType ?? 'button'}
      className={classNames}
      {...rest}
    >
      {children}
    </button>
  );
};

export { ButtonStyle as ButtonType, ButtonSize };
export default Button;
